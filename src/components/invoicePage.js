import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./invoicePage.css";
import "./../toggle.css";
import UpdateInvoice from "./forms/UpdateInvoice";
import { DataContext } from "../shared/context";
//import dataI from "../data.json";
import Home from "./home";

const InvoicePage = (props) => {
  const { handleDelete } = useContext(DataContext);
  const [showUpdate, setShowUpdate] = useState(false);
  const openShowUpdate = () => setShowUpdate(true);
  const closeShowUpdate = () => setShowUpdate(false);
  const [invoice, setInvoice] = useState({});
  //invoiceID is the name of the route used in App.js
  const invoiceID = useParams().invoiceId;
  useEffect(() => {
    const timer = setTimeout(() => {
      const invoiceFound = props.data.filter((invoice) => invoice.id === invoiceID);
      setInvoice(invoiceFound);
      const { status, id, description, createdAt, paymentDue, clientEmail, total, clientAddress } = invoiceFound[0];
      const { street, city, postCode, country } = invoiceFound[0].senderAddress;
    }, 100);
    return () => clearTimeout(timer);
  }, [props.data]);

  let history = useHistory(); // Works!

  const handleDeletewithR = (e) => {
    history.push("/");
    handleDelete(e);
  };
  return (
    <div>
      <div className="header">
        <UpdateInvoice
          show={showUpdate}
          onCancel={closeShowUpdate}
          header={invoiceID}
          contentClass="new__modal-content"
          footerClass="new__modal-actions"
          invoice={invoice[0]}
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
            <button onClick={openShowUpdate}> Edit </button>{" "}
            <button id={invoiceID} onClick={handleDeletewithR}>
              {" "}
              Delete{" "}
            </button>{" "}
            <button> Mark as Paid </button>
          </div>
        </div>

        <div className="invoiceBody"></div>
      </div>
    </div>
  );
};
export default InvoicePage;
