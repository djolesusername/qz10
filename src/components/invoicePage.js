import React, { useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import "./invoicePage.css";
import "./../toggle.css";
import "./home.css";

import UpdateInvoice from "./forms/UpdateInvoice";
import { DataContext } from "../shared/context";
//import dataI from "../data.json";
import Home from "./home";

const InvoicePage = (props) => {
  console.log(Home);
  const { handleDelete } = useContext(DataContext);
  const [showUpdate, setShowUpdate] = useState(false);
  const openShowUpdate = () => setShowUpdate(true);
  const closeShowUpdate = () => setShowUpdate(false);
  const [invoice, setInvoice] = useState({});
  //invoiceID is the name of the route used in App.js
  const invoiceID = useParams().invoiceId;
  const invoiceFound = props.data.filter((invoice) => invoice.id === invoiceID);
  const [status, setStatus] = useState(invoiceFound.status);
  const [description, setDescription] = useState(invoiceFound.description);
  const [createdAt, setCreatedAt] = useState(invoiceFound.status);
  const [paymentDue, setPaymentDue] = useState(invoiceFound.status);
  const [clientEmail, setclientEmail] = useState(invoiceFound.status);
  const [total, setTotal] = useState(invoiceFound.status);
  const [clientAddress, setClientAddress] = useState(invoiceFound.status);
  const [street, setStreet] = useState(invoiceFound.status);
  const [city, setCity] = useState(invoiceFound.status);
  const [postCode, setPostCode] = useState(invoiceFound.status);

  const [country, setCountry] = useState(invoiceFound.status);

  useEffect(() => {
    const timer = setTimeout(() => {
      const invoiceFound = props.data.filter((invoice) => invoice.id === invoiceID);
      setInvoice(invoiceFound);
      const { status, description, createdAt, paymentDue, clientEmail, total, clientAddress } = invoiceFound[0];
      const { street, city, postCode, country } = invoiceFound[0].senderAddress;
      setStatus(status);
      setDescription(description);
      setCreatedAt(createdAt);
      setPaymentDue(paymentDue);
      setclientEmail(clientEmail);
      setTotal(total);
      setClientAddress(clientAddress);
      setStreet(street);
      setCity(city);
      setPostCode(postCode);
      setCountry(country);
    }, 100);
    return () => clearTimeout(timer);
  }, [props.data, invoiceID]);

  let history = useHistory(); // Works!
  const handleDeletewithR = (e) => {
    history.push("/");
    handleDelete(e);
  };
  return (
    <div className="main-page-container">
      <div className="header-container header">
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
            <div> Status </div> <div> {status}</div>{" "}
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

        <div className="invoiceBody">
          Body {invoiceID} {description} {createdAt} {paymentDue}
          {clientEmail} {total} {clientAddress} {street} {city} {postCode} {country}
        </div>
      </div>
    </div>
  );
};
export default InvoicePage;
