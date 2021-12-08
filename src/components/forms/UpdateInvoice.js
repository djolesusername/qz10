import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import "../../toggle.css";
import Backdrop from "./Backdrop";
import Input from "./Input";
import { VALIDATOR_REQUIRE } from "./validators";
import Select from "react-dropdown-select";
import { useHistory } from "react-router-dom";

import ItemList from "./ItemList.js";
import "../header/header.css";
import { useForm } from "./formHook";
import { DataContext } from "../../shared/context";

const options = [
  { value: "30", label: "Net 30 days" },
  { value: "14", label: "Net 14 days" },
  { value: "7", label: "Net 7 days" },
  { value: "1", label: "Net 1 days" },
];
let date = Date.now();

const checkIndex = (paymentTerms) => {
  for (let i = 0; i < options.length; i++) {
    if (parseInt(paymentTerms) === parseInt(options[i].value)) {
      return i;
    }
  }
};

const ModalOverlay = (props) => {
  console.log(props);
  const context = useContext(DataContext);
  const handleUpdate = context.handleUpdate;
  const [itemList, setItemList] = useState(props.invoice.items);
  const { id, description, createdAt, clientEmail, paymentTerms, clientName } = props.invoice;
  const { street, city, postCode, country } = props.invoice.senderAddress;
  //const { btStreet, btCity, btPostCode, btCountry } = props.invoice.clientAddress;

  const pTerms = checkIndex(paymentTerms);
  const selectHandler = (e) => {
    inputHandler("pterms", e[0].value, true);
    console.log(e[0].value);
  };

  const [formState, inputHandler] = useForm(
    {
      bfStreetAddress: {
        value: street,
        isValid: true,
      },
      bfCity: {
        value: city,
        isValid: true,
      },
      bfPostCode: {
        value: postCode,
        isValid: true,
      },
      bfCountry: {
        value: country,
        isValid: true,
      },
      btName: {
        value: clientName,
        isValid: true,
      },
      btEmail: {
        value: clientEmail,
        isValid: true,
      },
      btStreet: {
        value: props.invoice.clientAddress.street,
        isValid: true,
      },
      btCity: {
        value: props.invoice.clientAddress.city,
        isValid: true,
      },
      btPostCode: {
        value: props.invoice.clientAddress.postCode,
        isValid: true,
      },
      btCountry: {
        value: props.invoice.clientAddress.country,
        isValid: true,
      },
      invoiceDate: {
        value: createdAt,
        isValid: true,
      },
      projectDesc: {
        value: description,
        isValid: true,
      },
      pterms: {
        value: paymentTerms,
        isValid: true,
      },
      itemList: {
        value: [],
        isValid: true,
      },
      id: {
        value: props.invoice.id,
        isValid: true,
      },
    },
    true
  );
  let history = useHistory(); // Works!

  const invoiceUpdateSubmitHandler = (event) => {
    history.push("/");

    event.preventDefault();
    handleUpdate(formState, itemList);
  };

  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      <h2 className="edit-heading">
        {" "}
        Edit <span className="light-text">#</span>
        {id}{" "}
      </h2>
      <form onSubmit={invoiceUpdateSubmitHandler}>
        <div className="bill-from grid-3columns">
          <span className="special-text"> Bill From </span>
          <div className="grid-full custom-input">
            <Input
              type="text"
              label="Street Address"
              id="bfStreetAddress"
              element="input"
              onInput={inputHandler}
              value={formState.inputs.bfStreetAddress.value}
              validators={[VALIDATOR_REQUIRE()]}
              errorText="can't be empty"
            />
          </div>
          <div className="grid-1outof3 custom-input">
            <Input
              type="text"
              label="City"
              errorText="This field is required"
              element="input"
              onInput={inputHandler}
              value={formState.inputs.bfCity.value}
              id="bfCity"
              validators={[VALIDATOR_REQUIRE()]}
            />
          </div>
          <div className="grid-1outof3 custom-input">
            <Input
              type="text"
              label="Post Code"
              id="bfPostCode"
              element="input"
              onInput={inputHandler}
              value={formState.inputs.bfPostCode.value}
              validators={[VALIDATOR_REQUIRE()]}
              errorText="can't be empty"
            />
          </div>
          <div className="grid-1outof3 custom-input">
            <Input
              type="text"
              label="Country"
              element="input"
              id="bfCountry"
              onInput={inputHandler}
              value={formState.inputs.bfCountry.value}
              validators={[VALIDATOR_REQUIRE()]}
              errorText="can't be empty"
            />
          </div>
        </div>
        <div className="bill-to grid-3columns custom-input">
          {" "}
          Bill To
          <div className="grid-full">
            <Input
              type="text"
              label="Client's name"
              id="btName"
              onInput={inputHandler}
              value={formState.inputs.btName.value}
              element="input"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="can't be empty"
            />
          </div>
          <div className="grid-full custom-input">
            <Input
              type="email"
              label="Client's email"
              id="btEmail"
              onInput={inputHandler}
              value={formState.inputs.btEmail.value}
              element="input"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="can't be empty"
            />
          </div>
          <div className="grid-full custom-input">
            <Input
              type="text"
              label="Street Address"
              id="btStreet"
              element="input"
              onInput={inputHandler}
              value={formState.inputs.btStreet.value}
              validators={[VALIDATOR_REQUIRE()]}
              errorText="can't be empty"
            />
          </div>
          <div className="grid-1outof3 custom-input">
            <Input
              type="text"
              label="City"
              id="btCity"
              element="input"
              onInput={inputHandler}
              value={formState.inputs.btCity.value}
              validators={[VALIDATOR_REQUIRE()]}
              errorText="can't be empty"
            />
          </div>
          <div className="grid-1outof3 ">
            <Input
              type="text"
              label="Post Code"
              id="btPostCode"
              element="input"
              onInput={inputHandler}
              value={formState.inputs.btPostCode.value}
              validators={[VALIDATOR_REQUIRE()]}
              errorText="can't be empty"
            />
          </div>
          <div className="grid-1outof3 ">
            <Input
              type="text"
              label="Country"
              id="btCountry"
              element="input"
              onInput={inputHandler}
              value={formState.inputs.btCountry.value}
              validators={[VALIDATOR_REQUIRE()]}
              errorText="can't be empty"
            />
          </div>
        </div>
        <div className="grid-2columns">
          <div className="grid-1outof2">
            <Input
              type="date"
              label="Invoice date"
              id="invoiceDate"
              element="input"
              onInput={inputHandler}
              value={formState.inputs.invoiceDate.value}
              initialValue={date}
              validators={[VALIDATOR_REQUIRE()]}
            />
          </div>
          <div className="grid-1outof2 select">
            <Select id="pterms" name="pterms" options={options} values={[options[pTerms]]} onChange={selectHandler} />
          </div>
        </div>
        <div className="grid-full">
          <Input
            errorText="This field is required"
            type="text"
            label="Project Description"
            element="input"
            onInput={inputHandler}
            value={formState.inputs.projectDesc.value}
            id="projectDesc"
            validators={[VALIDATOR_REQUIRE()]}
          />
        </div>
        <ItemList id="itemlist" itemList={itemList} setItemList={setItemList} />
        <div class="form-buttons">
          <span> </span>
          <span> </span>

          <button type="button" onClick={props.onCancel}>
            Cancel{" "}
          </button>

          <button type="submit">Save Changes </button>
        </div>
        <div className={`modal__content ${props.contentClass}`}> {props.children}</div>
        <footer className={`modal__footer ${props.footerClass}`}>{props.footer}</footer>
        {!formState.isValid && <p> Yo, fix it up</p>}
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
