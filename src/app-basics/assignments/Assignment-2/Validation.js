import React from "./node_modules/react";

const Validation = prop => {
  const length = prop.length;
  let message = null;
  if (length < 5) {
    message = <p>Text length too short. Minimum 5 characters</p>;
  } else if (length > 14) {
    message = <p>Text length too long. Maximum 14 characters</p>;
  }
  return message;
};

export default Validation;
