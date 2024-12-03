/* eslint-disable no-unused-vars */
import React, { useEffect, useRef, useState } from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import GigCard from "../../components/gigCard/GigCard";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import "./GigList.css";
import { useLocation } from "react-router-dom";

function GigList() {
  const [sort, setSort] = useState("Popularity");
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();

  const reSort = (type) => {
    setSort(type);
    setOpen(false);
  };

  useEffect(() => {
    refetch();
  }, [sort]);

  const apply = () => {
    refetch();
  };

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ["gigList"],
    queryFn: () =>
      axios
        .get(
          `http://localhost:8800/api/gigs/get-gig-list?${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
        )
        .then((res) => {
          return res.data;
        }),
  });

  return (
    <div className="gigList">
      <span>
        <Breadcrumb>
          <Breadcrumb.Item href="/">Home</Breadcrumb.Item>
          <Breadcrumb.Item active>Gig List</Breadcrumb.Item>
        </Breadcrumb>
      </span>
      <div className="gigListContainer">
        <h1>AI Services</h1>
        <p>
          Harnessing AI innovation for smarter, efficient solutions everywhere.
        </p>
        <div className="gigListMenu">
          <div className="gigListMenuLeft">
            <span>Budget</span>
            <input ref={minRef} type="number" placeholder="min budget" />
            <input ref={maxRef} type="number" placeholder="max budget" />
            <button onClick={apply}>Apply</button>
          </div>
          <div className="gigListMenuRight">
            <span className="sortBy">
              <div className="gigListDropdown">
                <div className="mb-2">
                  <DropdownButton
                    as={ButtonGroup}
                    key="down-centered"
                    id={`dropdown-button-drop-down-centered`}
                    drop="down-centered"
                    variant="secondary"
                    title={
                      <>
                        <FontAwesomeIcon icon={faFilter} className="me-2" />
                        Sort By
                      </>
                    }
                  >
                    <Dropdown.Item
                      eventKey="1"
                      onClick={() => reSort("popularity")}
                    >
                      Popularity
                    </Dropdown.Item>
                    <Dropdown.Item
                      eventKey="2"
                      onClick={() => reSort("newest")}
                    >
                      Newest
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="3" onClick={() => reSort("price")}>
                      Price
                    </Dropdown.Item>
                  </DropdownButton>
                </div>
              </div>
            </span>
          </div>
        </div>
        <div className="gigListCards">
          <div className="gigListCard">
            {isLoading
              ? "loading..."
              : error
              ? "something went wrong!"
              : data.map((gig) => <GigCard key={gig._id} gig={gig} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GigList;
