import React from "react";
import arrow from "../assets/icon-arrow-right.svg";
import "./invoices.css";

const InvoiceRow = (props) => {
  return (
    <div className="invoice-row">
      <div> {props.id}</div>
      <div> {props.createdAt}</div>

      <div>{props.name} </div>
      <div> {props.total}</div>
      <div> {props.status} </div>
      <div>
        <img src={arrow} alt="" />
      </div>
    </div>
  );
};
export default InvoiceRow;
