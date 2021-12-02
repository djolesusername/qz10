import React, { useState } from "react";
import Dropdown from "./dropdown";
import plusSign from "../../assets/icon-plus.svg";
import "./header.css";
import "../../toggle.css";
import Modal from "../forms/Modal";

const Header = (props) => {
  const [showNew, setShowNew] = useState(false);
  const openShowNew = () => setShowNew(true);
  const closeShowNew = () => setShowNew(false);
  return (
    <div className="header">
      <Modal
        show={showNew}
        close={closeShowNew}
        onCancel={closeShowNew}
        header={props.id}
        contentClass="new__modal-content"
        footerClass="new__modal-actions"
      >
        {" "}
        <div className="form-container"></div>
      </Modal>

      <div>
        <h1>Invoices</h1> <p>There are {props.invoices.data.length} invoices </p>
      </div>
      <div className="header__end ">
        <Dropdown />

        <div className="regularButton" onClick={openShowNew}>
          {" "}
          <img src={plusSign} alt="newInvoice" />
          <span> New invoice </span>
        </div>
      </div>
    </div>
  );
};
export default Header;
