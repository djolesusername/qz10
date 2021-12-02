import React, { useState, useContext } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import Backdrop from "./Backdrop";
import Input from "./Input";
import { VALIDATOR_REQUIRE } from "./validators";
import Select from "react-dropdown-select";
import ItemList from "./ItemList.js";
import useForm from "./formHook";
import { DataContext } from "../../shared/context";
//usecallback - wrap a function and define dependencies under which it should re-render
//making sure that function inside another function is not recreated when original one is ran

const options = [
  { value: "30", label: "Net 30 days" },
  { value: "14", label: "Net 14 days" },
  { value: "7", label: "Net 7 days" },
  { value: "1", label: "Net 1 days" },
];
let date = Date.now();

const ModalOverlay = (props) => {
  const context = useContext(DataContext);
  const handleAdd = context.handleAdd;
  const [itemList, setItemList] = useState([]);
  const [status, setStatus] = useState(["draft"]);

  const [formState, inputHandler] = useForm(
    {
      bfStreetAddress: {
        value: "",
        isValid: false,
      },
      bfCity: {
        value: "",
        isValid: false,
      },
      bfPostCode: {
        value: "",
        isValid: false,
      },
      bfCountry: {
        value: "",
        isValid: false,
      },
      btName: {
        value: "",
        isValid: false,
      },
      btEmail: {
        value: "",
        isValid: false,
      },
      btStreet: {
        value: "",
        isValid: false,
      },
      btCity: {
        value: "",
        isValid: false,
      },
      btPostCode: {
        value: "",
        isValid: false,
      },
      btCountry: {
        value: "",
        isValid: false,
      },
      invoiceDate: {
        value: date,
        isValid: false,
      },
      projectDesc: {
        value: "",
        isValid: false,
      },
      pterms: {
        value: "30",
        isValid: true,
      },
      itemList: {
        value: [],
        isValid: false,
      },
    },
    false
  );

  const invoiceSubmitHandler = (event) => {
    console.log(event.target);
    event.preventDefault();
    handleAdd(formState, itemList, status);
    props.close();
  };
  const selectHandler = (e) => {
    inputHandler("pterms", e[0].value, true);
  };

  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      {/* <header className={`modal__header ${props.headerClass}`}></header> */}
      <form onSubmit={invoiceSubmitHandler}>
        <div className="bill-from grid-3columns">
          {" "}
          Bill From
          <div className="grid-full">
            <Input
              type="text"
              label="Street Address"
              id="bfStreetAddress"
              element="input"
              errorText="can't be empty"
              onInput={inputHandler}
              validators={[VALIDATOR_REQUIRE()]}
            />
          </div>
          <div className="grid-1outof3">
            <Input
              type="text"
              label="City"
              errorText="can't be empty"
              element="input"
              onInput={inputHandler}
              id="bfCity"
              validators={[VALIDATOR_REQUIRE()]}
            />
          </div>
          <div className="grid-1outof3">
            <Input
              type="text"
              label="Post Code"
              id="bfPostCode"
              element="input"
              onInput={inputHandler}
              validators={[VALIDATOR_REQUIRE()]}
            />
          </div>
          <div className="grid-1outof3">
            <Input
              type="text"
              errorText="can't be empty"
              label="Country"
              element="input"
              id="bfCountry"
              onInput={inputHandler}
              validators={[VALIDATOR_REQUIRE()]}
            />
          </div>
        </div>
        <div className="bill-to grid-3columns">
          {" "}
          Bill To
          <div className="grid-full">
            <Input
              type="text"
              label="Client's name"
              id="btName"
              errorText="can't be empty"
              onInput={inputHandler}
              element="input"
              validators={[VALIDATOR_REQUIRE()]}
            />
          </div>
          <div className="grid-full">
            <Input
              type="email"
              label="Client's email"
              id="btEmail"
              errorText="can't be empty"
              onInput={inputHandler}
              element="input"
              placeholder="e.g.email@example.com"
              validators={[VALIDATOR_REQUIRE()]}
            />
          </div>
          <div className="grid-full">
            <Input
              type="text"
              label="Street Address"
              id="btStreet"
              errorText="can't be empty"
              onInput={inputHandler}
              element="input"
              validators={[VALIDATOR_REQUIRE()]}
            />
          </div>
          <div className="grid-1outof3">
            <Input
              type="text"
              label="City"
              id="btCity"
              errorText="can't be empty"
              element="input"
              onInput={inputHandler}
              validators={[VALIDATOR_REQUIRE()]}
            />
          </div>
          <div className="grid-1outof3">
            <Input
              type="text"
              label="Post Code"
              id="btPostCode"
              errorText="can't be empty"
              element="input"
              onInput={inputHandler}
              validators={[VALIDATOR_REQUIRE()]}
            />
          </div>
          <div className="grid-1outof3">
            <Input
              type="text"
              label="Country"
              errorText="can't be empty"
              id="btCountry"
              element="input"
              onInput={inputHandler}
              validators={[VALIDATOR_REQUIRE()]}
            />
          </div>
        </div>
        <div className="grid-2columns hold-date-select">
          <div className="grid-1outof2 date">
            <Input
              type="date"
              label="Invoice date"
              id="invoiceDate"
              element="input"
              onInput={inputHandler}
              value={date}
              initialValue={date}
              validators={[VALIDATOR_REQUIRE()]}
            />
          </div>
          <div className="grid-1outof2 select">
            <Select id="pterms" name="pterms" options={options} values={[options[0]]} onChange={selectHandler} />
          </div>
        </div>
        <div className="grid-full project-desription">
          <Input
            errorText="This field is required"
            type="text"
            label="Project Description"
            element="input"
            onInput={inputHandler}
            id="projectDesc"
            placeholder="e.g.Graphic Design Service"
            validators={[VALIDATOR_REQUIRE()]}
          />
        </div>
        <ItemList id="itemlist" itemList={itemList} setItemList={setItemList} />
        <div className={`modal__content ${props.contentClass}`}> {props.children}</div>
        {!formState.isValid && <p className="errorMessage"> All fields must be added</p>}
        {!formState.isValid && <p className="errorMessage"> An item must be added</p>}
        <footer className={`modal__footer ${props.footerClass}`}>{props.footer}</footer>
        <div class="form-buttons">
          <button className="discard"> Discard</button>
          <span> </span>

          <button className="draft" type="submit">
            Save as draft{" "}
          </button>

          <button
            type="submit"
            onClick={() => {
              setStatus("Pending");
            }}
          >
            Save & Send
          </button>
        </div>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById("modal-hook"));
};

const Modal = (props) => {
  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} />}
      {props.show && <ModalOverlay {...props} />}
    </React.Fragment>
  );
};
export default Modal;
