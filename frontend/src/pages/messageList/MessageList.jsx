import * as React from "react";
import PropTypes from "prop-types";
import { CssBaseline } from "@mui/material";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import { visuallyHidden } from "@mui/utils";
import ChatIcon from "@mui/icons-material/Chat";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import moment from "moment";

import "./MessageList.css";
import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const headCells = [
  { id: "userId", numeric: false, disablePadding: false, label: "User ID" },
  {
    id: "lastMessage",
    numeric: false,
    disablePadding: false,
    label: "Last Message",
  },
  { id: "date", numeric: false, disablePadding: false, label: "Date" },
  { id: "actions", numeric: false, disablePadding: false, label: "Actions" },
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) return -1;
  if (b[orderBy] > a[orderBy]) return 1;
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) =>
    onRequestSort(event, property);

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(["asc", "desc"]).isRequired,
  orderBy: PropTypes.string.isRequired,
};

export default function MessageList() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("date");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const visibleRows = React.useMemo(
    () =>
      stableSort(rows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, rows]
  );

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("currentUser"))
  );

  const token = currentUser?.token;
  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      axios
        .get(`http://localhost:8800/api/conversations/get-conversation-list`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setRows(res.data);
          return res.data;
        }),
  });

  // Mutation to add a message
  const mutation = useMutation({
    mutationFn: (id) => {
      const token = currentUser?.token; // Retrieve token from the current user
      return axios.put(
        `http://localhost:8800/api/conversations/update-conversation/${id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Add token to headers
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
    onError: (error) => {
      // alert(`Error: ${error.response?.data || "Something went wrong"}`);
      console.log("error");
    },
  });

  const handleReadMessage = (id) => {
    mutation.mutate(id);
    navigate(`/message/${id}`);
  };

  return (
    <div className="MessageList">
      <span>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>My Messages</Breadcrumb.Item>
        </Breadcrumb>
      </span>
      {isLoading ? (
        "loading..."
      ) : error ? (
        "something went wrong"
      ) : (
        <div className="MessageListContainer">
          <div className="ManageGigContainerHeader">
            <h2>My Messages</h2>
          </div>
          <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
              <TableContainer>
                <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                  <EnhancedTableHead
                    order={order}
                    orderBy={orderBy}
                    onRequestSort={handleRequestSort}
                  />
                  <TableBody>
                    {visibleRows.map((row) => (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={row.id}
                        className={
                          (currentUser.isSeller && !row.readBySeller) ||
                          (!currentUser.isSeller && !row.readByBuyer)
                            ? "unread"
                            : ""
                        }
                      >
                        <TableCell align="center">
                          {((currentUser.isSeller && !row.readBySeller) ||
                            (!currentUser.isSeller && !row.readByBuyer)) && (
                            <span className="unread-dot"></span>
                          )}
                          {currentUser.isSeller ? row.buyerId : row.sellerId}
                        </TableCell>
                        <TableCell align="center">{row.lastMessage}</TableCell>
                        <TableCell align="center">
                          {moment(row.updatedAt).fromNow()}
                        </TableCell>
                        <TableCell align="center">
                          <ChatIcon
                            className="chatIcon"
                            onClick={() => handleReadMessage(row.id)}
                          ></ChatIcon>
                        </TableCell>
                      </TableRow>
                    ))}
                    {visibleRows.length === 0 && (
                      <TableRow>
                        <TableCell colSpan={headCells.length} align="center">
                          No messages found
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </Paper>
          </Box>
        </div>
      )}
    </div>
  );
}
