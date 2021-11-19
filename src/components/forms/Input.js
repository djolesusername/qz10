import React, { useReducer, useEffect } from "react";

import { validate } from "./validators";
import "./Input.css";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators),
      };
    case "TOUCH": {
      return {
        ...state,
        isTouched: true,
      };
    }
    default:
      return state;
  }
};

const Input = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: "",
    isTouched: false,
    isValid: false,
  });

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators,
    });
  };

  const touchHandler = () => {
    dispatch({
      type: "TOUCH",
    });
  };
  let optionsHTML = "";
  const getOptions = (options) => {
    console.log(Object.entries(options));
    for (const [key, value] of Object.entries(options)) {
      optionsHTML += `<option value=${value}> ${key} </option>`;
    }
  };
  if (props.element === "dropdown") {
    getOptions(props.options);
  }

  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <select multiple={true} name={props.id} id={props.id} value={[props.value[0]]} onChange={changeHandler}>
        {optionsHTML}
      </select>
    );

  return (
    <div className={`form-control ${!inputState.isValid && inputState.isTouched && "form-control--invalid"}`}>
      <div className="label-error">
        {" "}
        <label htmlFor={props.id}>{props.label}</label>{" "}
        {!inputState.isValid && inputState.isTouched && <span className="errorMessage">{props.errorText}</span>}{" "}
      </div>
      {element}
    </div>
  );
};

export default Input;
