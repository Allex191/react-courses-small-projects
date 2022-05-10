import React from "react";
import classes from "./MyInput.module.css";

const MyInput = (props) => {
  return (
    <div className={[classes.inputWrapper, props.className].join(" ")}>
      <label className={props.label.className} htmlFor={props.input.id}>
        {props.label.name}
      </label>
      <input
        {...props.input}
        className={[classes.input, props.input.className].join(" ")}
      />
    </div>
  );
};

export default MyInput;
