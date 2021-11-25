import React, { useCallback, useReducer, useState } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import Backdrop from "./Backdrop";
import Input from "./Input";
import { VALIDATOR_REQUIRE } from "./validators";
import Select from "react-dropdown-select";
import ItemList from "./ItemList.js";
import "../header/header.css";

const options = [
  { value: "30", label: "Net 30 days" },
  { value: "14", label: "Net 14 days" },
  { value: "7", label: "Net 7 days" },
  { value: "1", label: "Net 1 days" },
];
let date = Date.now();

const ModalOverlay = (props) => {
  const { status, id, description, createdAt, paymentDue, clientEmail, total, clientAddress } = props.invoice;
  const { street, city, postCode, country } = props.invoice.senderAddress;
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <form>
        <div className="bill-from grid-3columns">
          {" "}
          Bill From
          <div className="grid-full">
            <Input
              type="text"
              label="Street Address"
              id="bfStreetAddress"
              element="input"
              onInput={() => {}}
              value={street}
              validators={[VALIDATOR_REQUIRE()]}
            />
          </div>
          <div className="grid-1outof3">
            <Input
              type="text"
              label="City"
              errorText="This field is required"
              element="input"
              onInput={() => {}}
              id="bfCity"
              validators={[VALIDATOR_REQUIRE()]}
            />
          </div>
          <div className="grid-1outof3">
            <Input type="text" label="Post Code" id="bfPostCode" element="input" onInput={() => {}} validators={[VALIDATOR_REQUIRE()]} />
          </div>
          <div className="grid-1outof3">
            <Input type="text" label="Country" element="input" id="bfCountry" onInput={() => {}} validators={[VALIDATOR_REQUIRE()]} />
          </div>
        </div>
        <div className="bill-to grid-3columns">
          {" "}
          Bill To
          <div className="grid-full">
            <Input type="text" label="Client's name" id="btName" onInput={() => {}} element="input" validators={[VALIDATOR_REQUIRE()]} />
          </div>
          <div className="grid-full">
            <Input type="email" label="Client's email" id="btEmail" onInput={() => {}} element="input" validators={[VALIDATOR_REQUIRE()]} />
          </div>
          <div className="grid-full">
            <Input type="text" label="Street Address" id="btStreet" onInput={() => {}} element="input" validators={[VALIDATOR_REQUIRE()]} />
          </div>
          <div className="grid-1outof3">
            <Input type="text" label="City" id="btCity" element="input" onInput={() => {}} validators={[VALIDATOR_REQUIRE()]} />
          </div>
          <div className="grid-1outof3">
            <Input type="text" label="Post Code" id="btPostCode" element="input" onInput={() => {}} validators={[VALIDATOR_REQUIRE()]} />
          </div>
          <div className="grid-1outof3">
            <Input type="text" label="Country" id="btCountry" element="input" onInput={() => {}} validators={[VALIDATOR_REQUIRE()]} />
          </div>
        </div>
        <div className="grid-2columns">
          <div className="grid-1outof2">
            <Input
              type="date"
              label="Invoice date"
              id="invoiceDate"
              element="input"
              onInput={() => {}}
              value={date}
              initialValue={date}
              validators={[VALIDATOR_REQUIRE()]}
            />
          </div>
        </div>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const UpdateInvoice = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      {props.show && <ModalOverlay {...props} />}
    </React.Fragment>
  );
};

export default UpdateInvoice;
