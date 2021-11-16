import React from "react";
import Dropdown from "./dropdown";
import plusSign from "../../assets/icon-plus.svg";
import "./header.css";
import "../../toggle.css";

const Header = (props) => {
  return (
    <div className="header">
      <div>
        <h1>Invoices</h1> <p>There are {props.invoices.data.length} invoices </p>
      </div>
      <div className="header__end ">
        <Dropdown />

        <div className="regularButton">
          {" "}
          <img src={plusSign} alt="newInvoice" />
          <span> New invoice </span>
        </div>
      </div>
    </div>
  );
};
export default Header;
