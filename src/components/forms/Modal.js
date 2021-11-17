import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import Backdrop from "./Backdrop";
// import { CSSTransition } from "react-transition-group";
import Input from "./Input";
import { VALIDATOR_REQUIRE } from "./validators";
import Dropdown from "./Dropdown";

const ModalOverlay = (props) => {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      {/* <header className={`modal__header ${props.headerClass}`}></header> */}
      <form onSubmit={props.onSubmit ? props.onSubmit : (event) => event.preventDefault()}>
        <div className="bill-from grid-3columns">
          {" "}
          Bill From
          <div className="grid-full">
            <Input type="text" label="Street Address" element="input" validators={[VALIDATOR_REQUIRE()]} />
          </div>
          <div className="grid-1outof3">
            <Input type="text" label="City" element="input" validators={[VALIDATOR_REQUIRE()]} />
          </div>
          <div className="grid-1outof3">
            <Input type="text" label="Post Code" element="input" validators={[VALIDATOR_REQUIRE()]} />
          </div>
          <div className="grid-1outof3">
            <Input type="text" label="Country" element="input" validators={[VALIDATOR_REQUIRE()]} />
          </div>
        </div>
        <div className="bill-to grid-3columns">
          {" "}
          Bill To
          <div className="grid-full">
            <Input type="text" label="Client's name" element="input" validators={[VALIDATOR_REQUIRE()]} />
          </div>
          <div className="grid-full">
            <Input type="email" label="Client's email" element="input" validators={[VALIDATOR_REQUIRE()]} />
          </div>
          <div className="grid-full">
            <Input type="text" label="Street Address" element="input" validators={[VALIDATOR_REQUIRE()]} />
          </div>
          <div className="grid-1outof3">
            <Input type="text" label="City" element="input" validators={[VALIDATOR_REQUIRE()]} />
          </div>
          <div className="grid-1outof3">
            <Input type="text" label="Post Code" element="input" validators={[VALIDATOR_REQUIRE()]} />
          </div>
          <div className="grid-1outof3">
            <Input type="text" label="Country" element="input" validators={[VALIDATOR_REQUIRE()]} />
          </div>
        </div>
        <div className="grid-2columns">
          <div className="grid-1outof2">
            <Input type="date" label="Invoice date" element="input" validators={[VALIDATOR_REQUIRE()]} />
          </div>
          <div className="grid-1outof2">
            {" "}
            <Dropdown />
          </div>
        </div>
        <div className="grid-full">
          <Input type="text" label="Project Description" element="input" validators={[VALIDATOR_REQUIRE()]} />
        </div>
        <div className={`modal__content ${props.contentClass}`}> {props.children}</div>
        <footer className={`modal__footer ${props.footerClass}`}>{props.footer}</footer>
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
