import React from "react";
import ReactDOM from "react-dom";
import "./Modal.css";
import Backdrop from "./Backdrop";
import { CSSTransition } from "react-transition-group";
import Input from "./Input";
import { VALIDATOR_REQUIRE } from "./validators";

const ModalOverlay = (props) => {
  const content = (
    <div className={`modal ${props.className}`} style={props.style}>
      {/* <header className={`modal__header ${props.headerClass}`}></header> */}
      <form onSubmit={props.onSubmit ? props.onSubmit : (event) => event.preventDefault()}>
        <div> Bill From </div>
        <Input type="text" label="Street Address" element="input" validators={[VALIDATOR_REQUIRE()]} />
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
