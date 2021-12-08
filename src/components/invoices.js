import React from "react";
import arrow from "../assets/icon-arrow-right.svg";
import "./invoices.css";
import { Link, BrowserRouter } from "react-router-dom";

const InvoiceRow = (props) => {
  console.log(props);

  return (
    <div className="invoice-row">
      <div className="bold-text"> {props.id}</div>
      <div> {props.invoiceDue}</div>

      <div>{props.name} </div>
      <div className="bold-text sizePlus1"> £{props.total}</div>
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
