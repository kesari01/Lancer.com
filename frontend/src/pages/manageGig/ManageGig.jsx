/* eslint-disable no-unused-vars */
import * as React from "react";
import PropTypes from "prop-types";
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
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { visuallyHidden } from "@mui/utils";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import { useNavigate } from "react-router-dom";
import "./ManageGig.css";

const headCells = [
  { id: "gigName", numeric: false, disablePadding: false, label: "Gig Name" },
  { id: "gigImage", numeric: false, disablePadding: false, label: "Gig Image" },
  {
    id: "gigService",
    numeric: false,
    disablePadding: false,
    label: "Gig Service",
  },
  {
    id: "gigAuthor",
    numeric: false,
    disablePadding: false,
    label: "Gig Author",
  },
  { id: "gigPrice", numeric: true, disablePadding: false, label: "Gig Price" },
  { id: "action", numeric: false, disablePadding: false, label: "Action" },
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
            // align={headCell.numeric ? "right" : "left"}
            align="center"
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

function EnhancedTableToolbar({ searchQuery, onSearchChange }) {
  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        display: "flex",
        justifyContent: "space-between",
      }}
    >
      <Typography
        sx={{ flex: "1 1 100%" }}
        variant="h6"
        id="tableTitle"
        component="div"
      >
        Gigs List
      </Typography>
      <input
        type="text"
        value={searchQuery}
        onChange={onSearchChange}
        placeholder="Search..."
        style={{
          padding: "5px",
          borderRadius: "4px",
          border: "1px solid #ccc",
        }}
      />
    </Toolbar>
  );
}

EnhancedTableToolbar.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
};

export default function ManageGig() {
  const [order, setOrder] = React.useState("asc");
  const [orderBy, setOrderBy] = React.useState("gigPrice");
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [openEditDialog, setOpenEditDialog] = React.useState(false);
  const [selectedGig, setSelectedGig] = React.useState(null);

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

  const handleEdit = (gig) => {
    setSelectedGig(gig);
    setOpenEditDialog(true);
  };

  const handleDelete = (id) => {
    // Implement delete logic here
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filterRows = (rows, query) => {
    if (!query) return rows;
    return rows.filter((row) => {
      return (
        row.gigName.toLowerCase().includes(query.toLowerCase()) ||
        row.gigService.toLowerCase().includes(query.toLowerCase()) ||
        row.gigAuthor.toLowerCase().includes(query.toLowerCase()) ||
        row.gigPrice.toString().includes(query)
      );
    });
  };

  const filteredRows = filterRows(rows, searchQuery);

  const visibleRows = React.useMemo(
    () =>
      stableSort(filteredRows, getComparator(order, orderBy)).slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      ),
    [order, orderBy, page, rowsPerPage, filteredRows]
  );

  return (
    <div className="ManageGig">
      <Breadcrumb>
        <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
        <Breadcrumb.Item active>Manage Gigs</Breadcrumb.Item>
      </Breadcrumb>
      <div className="ManageGigContainer">
        <div className="ManageGigContainerHeader">
          <h2>Manage Gigs</h2>
          <button onClick={() => navigate("/add-new-gig")}>Add New Gig</button>
        </div>
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", mb: 2 }}>
            <EnhancedTableToolbar
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
            />
            <TableContainer>
              <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle">
                <EnhancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  rowCount={filteredRows.length}
                />
                <TableBody>
                  {visibleRows.map((row) => (
                    <TableRow hover tabIndex={-1} key={row.id}>
                      <TableCell component="th" scope="row">
                        {row.gigName}
                      </TableCell>
                      <TableCell align="left">
                        <img
                          src={row.gigImage}
                          alt={row.gigName}
                          style={{ width: "50px", height: "50px" }}
                        />
                      </TableCell>
                      <TableCell align="left">{row.gigService}</TableCell>
                      <TableCell align="left">{row.gigAuthor}</TableCell>
                      <TableCell align="right">{row.gigPrice}</TableCell>
                      <TableCell align="right">
                        <Tooltip title="Edit">
                          <IconButton
                            onClick={() => handleEdit(row)}
                            aria-label="edit"
                          >
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Delete">
                          <IconButton
                            onClick={() => handleDelete(row._id)}
                            aria-label="delete"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}
                  {filteredRows.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={headCells.length + 1} align="center">
                        No gigs found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredRows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>

          {/* Edit Dialog */}
          <Dialog open={openEditDialog} onClose={handleCloseEditDialog}>
            <DialogTitle>Edit Gig</DialogTitle>
            <DialogContent>
              <Typography>Gig Name: {selectedGig?.gigName}</Typography>
              {/* Add form fields for editing gig details */}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseEditDialog}>Cancel</Button>
              <Button onClick={handleCloseEditDialog}>Save</Button>
            </DialogActions>
          </Dialog>
        </Box>
      </div>
    </div>
  );
}
