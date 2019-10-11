import React from "react";

const UserInput = props => {
  return <input onChange={props.onInput} value={props.inputValue} />;
};

export default UserInput;
