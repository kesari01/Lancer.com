/* eslint-disable no-unused-vars */
import React from "react";
import Breadcrumb from "react-bootstrap/Breadcrumb";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import GigCard from "../../components/gigCard/GigCard";
import { gigs } from "../../data";
import "./GigList.css";

function GigList() {
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
            <input type="text" placeholder="min budget" />
            <input type="text" placeholder="max budget" />
            <button>Apply</button>
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
                    <Dropdown.Item eventKey="1">Popularity</Dropdown.Item>
                    <Dropdown.Item eventKey="2">Newest</Dropdown.Item>
                    <Dropdown.Item eventKey="3">Price</Dropdown.Item>
                  </DropdownButton>
                </div>
              </div>
            </span>
          </div>
        </div>
        <div className="gigListCards">
          <div className="gigListCard">
            {gigs.map((gig) => (
              <GigCard key={gig.id} item={gig} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default GigList;
