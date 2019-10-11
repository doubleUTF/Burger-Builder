import React from "react";
import styles from "./Input.module.css";

const input = props => {
  let inputElement;
  const inputClasses = [styles.InputElement];

  if (props.invalid && props.shouldValidate && props.touched) {
    inputClasses.push(styles.Invalid);
  }

  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          className={inputClasses.join(" ")}
          onChange={props.changed}
          {...props.elementConfig}
          value={props.value}
        ></input>
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={styles.InputElement}
          onChange={props.changed}
          {...props.elementConfig}
          value={props.value}
        ></textarea>
      );
      break;
    case "select":
      inputElement = (
        <select
          className={styles.InputElement}
          onChange={props.changed}
          {...props.elementConfig}
          value={props.value}
        >
          {props.elementConfig.options.map(option => (
            <option value={option.value} key={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    default:
      inputElement = (
        <input
          className={styles.InputElement}
          onChange={props.changed}
          {...props.elementConfig}
          value={props.value}
        ></input>
      );
  }
  return (
    <div className={styles.Input}>
      <label className={styles.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default input;
