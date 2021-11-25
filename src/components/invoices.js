import React, { useState } from "react";
import arrow from "../assets/icon-arrow-right.svg";
import "./invoices.css";
import { Link, Route, BrowserRouter } from "react-router-dom";
import InvoicePage from "./invoicePage";

const InvoiceRow = (props) => {
  return (
    <div className="invoice-row">
      <div> {props.id}</div>
      <div> {props.createdAt}</div>

      <div>{props.name} </div>
      <div> {props.total}</div>
      <div> {props.status} </div>
      <div>
        <BrowserRouter forceRefresh={true}>
          <Link to={`/${props.id}`}>
            <img src={arrow} alt="" />{" "}
          </Link>
        </BrowserRouter>
      </div>
    </div>
  );
};
export default InvoiceRow;
