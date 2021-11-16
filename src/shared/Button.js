import React from "react";
import plusSign from "../assets/icon-plus.svg";
import "./Button.css";

const Button = () => {
  return (
    <button>
      <img src={plusSign} alt="newInvoice" />
      New Invoice{" "}
    </button>
  );
};
export default Button;
