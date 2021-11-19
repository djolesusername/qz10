import React, { useCallback, useReducer } from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import Backdrop from "./Backdrop";
import Input from "./Input";
import { VALIDATOR_REQUIRE } from "./validators";
import Select from "react-dropdown-select";
import ItemList from "./ItemList.js";
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
  const formReducer = (state, action) => {
    switch (action.type) {
      case "INPUT_CHANGE":
        let formIsValid = true;
        for (const inputId in state.inputs) {
          if (inputId === action.inputId) {
            formIsValid = formIsValid && action.isValid;
          } else {
            formIsValid = formIsValid && state.inputs[inputId].isValid;
          }
        }
        return {
          ...state,
          inputs: {
            ...state.inputs,
            [action.inputId]: { value: action.value, isValid: action.isValid },
          },
          isValid: formIsValid,
        };
      default:
        return state;
    }
  };

  const [formState, dispatch] = useReducer(formReducer, {
    inputs: {
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
    },
    isValid: true,
  });

  const inputHandler = useCallback((id, value, isValid) => {
    dispatch({
      type: "INPUT_CHANGE",
      value: value,
      isValid: isValid,
      inputId: id,
    });
  }, []);
  const invoiceSubmitHandler = (event) => {
    event.preventDefault();
    console.log(formState);
  };
  const selectHandler = (e) => {
    inputHandler("pterms", e[0].value, true);
  };

  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      {/* <header className={`modal__header ${props.headerClass}`}></header> */}
      <form onSubmit={invoiceSubmitHandler}>
        <button type="submit">Button </button>
        <div className="bill-from grid-3columns">
          {" "}
          Bill From
          <div className="grid-full">
            <Input
              type="text"
              label="Street Address"
              id="bfStreetAddress"
              element="input"
              onInput={inputHandler}
              validators={[VALIDATOR_REQUIRE()]}
            />
          </div>
          <div className="grid-1outof3">
            <Input
              type="text"
              label="City"
              errorText="This field is required"
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
            <Input type="text" label="Country" element="input" id="bfCountry" onInput={inputHandler} validators={[VALIDATOR_REQUIRE()]} />
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
              onInput={inputHandler}
              element="input"
              validators={[VALIDATOR_REQUIRE()]}
            />
          </div>
          <div className="grid-full">
            <Input
              type="text"
              label="Street Address"
              id="btStreet"
              onInput={inputHandler}
              element="input"
              validators={[VALIDATOR_REQUIRE()]}
            />
          </div>
          <div className="grid-1outof3">
            <Input type="text" label="City" id="btCity" element="input" onInput={inputHandler} validators={[VALIDATOR_REQUIRE()]} />
          </div>
          <div className="grid-1outof3">
            <Input
              type="text"
              label="Post Code"
              id="btPostCode"
              element="input"
              onInput={inputHandler}
              validators={[VALIDATOR_REQUIRE()]}
            />
          </div>
          <div className="grid-1outof3">
            <Input type="text" label="Country" id="btCountry" element="input" onInput={inputHandler} validators={[VALIDATOR_REQUIRE()]} />
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
              value={date}
              initialValue={date}
              validators={[VALIDATOR_REQUIRE()]}
            />
          </div>
          <div className="grid-1outof2">
            <Select id="pterms" name="pterms" options={options} values={[options[0]]} onChange={selectHandler} />
          </div>
        </div>
        <div className="grid-full">
          <Input
            errorText="This field is required"
            type="text"
            label="Project Description"
            element="input"
            onInput={inputHandler}
            id="projectDesc"
            validators={[VALIDATOR_REQUIRE()]}
          />
        </div>
        <ItemList />
        <div className={`modal__content ${props.contentClass}`}> {props.children}</div>
        <footer className={`modal__footer ${props.footerClass}`}>{props.footer}</footer>
        {!formState.isValid && <p> Yo, fix it up</p>}
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
