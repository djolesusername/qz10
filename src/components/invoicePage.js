import React, { useState } from "react";
import { useParams } from "react-router-dom";
import data from "./../data.json";
import "./invoicePage.css";
import "./../toggle.css";
import UpdateInvoice from "./forms/UpdateInvoice";

const InvoicePage = (props) => {
  const [showUpdate, setShowUpdate] = useState(false);
  const openShowUpdate = () => setShowUpdate(true);
  const closeShowUpdate = () => setShowUpdate(false);
  //invoiceID is the name of the route used in App.js
  const invoiceID = useParams().invoiceId;
  const invoiceFound = data.filter((invoice) => invoice.id === invoiceID);
  // const { status, id, description, createdAt, paymentDue, clientEmail, total, clientAddress } = invoiceFound[0];
  // const { street, city, postCode, country } = invoiceFound[0].senderAddress;
  return (
    <div>
      <div className="header">
        <UpdateInvoice
          show={showUpdate}
          onCancel={closeShowUpdate}
          header={props.id}
          contentClass="new__modal-content"
          footerClass="new__modal-actions"
          invoice={invoiceFound[0]}
        >
          {" "}
          <div className="form-container"></div>
        </UpdateInvoice>

        <div></div>
        <div className="invoice-header">
          <div className="invoice-status">
            {" "}
            <div> Status </div> <div> status</div>{" "}
          </div>
          <div className="action-buttons">
            {" "}
            <button onClick={openShowUpdate}> Edit </button> <button> Delete </button> <button> Mark as Paid </button>
          </div>
        </div>

        <div className="invoiceBody"></div>
      </div>
    </div>
  );
};
export default InvoicePage;
