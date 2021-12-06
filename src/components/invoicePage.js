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
  const [createdAt, setCreatedAt] = useState(invoiceFound.createdAt);
  const [paymentDue, setPaymentDue] = useState(invoiceFound.paymentDue);
  const [clientEmail, setclientEmail] = useState(invoiceFound.clientEmail);
  const [total, setTotal] = useState(invoiceFound.total);
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [postCode, setPostCode] = useState("");
  const [btCity, setBtCity] = useState("");
  const [btStreet, setBtStreet] = useState("");
  const [btPostCode, setBtPostCode] = useState("");
  const [btCountry, setBtCountry] = useState("");
  const [country, setCountry] = useState(invoiceFound.status);
  const [clientName, setClientName] = useState(invoiceFound.clientName);
  const [itemList, setItemList] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const invoiceFound = props.data.filter((invoice) => invoice.id === invoiceID);
      setInvoice(invoiceFound);
      const { status, description, createdAt, paymentDue, clientName, clientEmail, total } = invoiceFound[0];
      const { street, city, postCode, country } = invoiceFound[0].senderAddress;
      const btStreet = invoiceFound[0].clientAddress.street;
      const btCity = invoiceFound[0].clientAddress.city;
      const btPostCode = invoiceFound[0].clientAddress.postCode;
      const btCountry = invoiceFound[0].clientAddress.country;
      const itemList = invoiceFound[0].items;
      setStatus(status);
      setDescription(description);
      setCreatedAt(createdAt);
      setPaymentDue(paymentDue);
      setclientEmail(clientEmail);
      setTotal(total);
      //setClientAddress(clientAddress);
      setStreet(street);
      setCity(city);
      setPostCode(postCode);
      setCountry(country);
      setBtCity(btCity);
      setBtStreet(btStreet);
      setBtPostCode(btPostCode);
      setItemList(itemList);
      setBtCountry(btCountry);
      setClientName(clientName);
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
      </div>

      <div className="invoiceBody">
        <div className="grid4outof4">
          <div>
            <span className="light-text big-text">#</span> <span className="big-text">{invoiceID} </span>
            <div className="light-text"> {description}</div>
          </div>
          <div> </div>
          <div> </div>
          <div>
            <div>{street} </div>
            <div> {city}</div>
            <div>{postCode}</div>
            <div>{country}</div>
          </div>
        </div>
        <div className="grid4outof4">
          <div>
            <div>Invoice Date</div>
            <div className="big-text">{createdAt} </div>
            <div className="row2">Payment Due</div>
            <div className="big-text">{paymentDue}</div>
          </div>
          <div>
            {" "}
            <div> Bill to</div>
            <div className="big-text"> {clientName}</div> <div> {btStreet}</div>
            <div> {btCity}</div>
            <div> {btPostCode} </div>
            <div> {btCountry}</div>
          </div>
          <div className="span2">
            <div>Sent to </div>
            <div className="big-text"> {clientEmail}</div>
          </div>
        </div>
        <div className="rundown">
          <div className="item-rundown grid4outof4">
            <div> Item Name</div>
            <div> QTY.</div>
            <div> Price</div>
            <div>Total </div>{" "}
          </div>
          {itemList.map((item, key) => {
            return (
              <div className="item-rundown grid4outof4" id={key}>
                <div> {item.name}</div>
                <div> {item.quantity}</div>
                <div> {item.price}</div>
                <div> {item.total}</div>
              </div>
            );
          })}
          <div class="item-total"> {total}</div>
        </div>
      </div>
    </div>
  );
};
export default InvoicePage;
