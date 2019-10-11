import React from "react";

const UserOutput = props => {
  const style = {
    textDecoration: "underline"
  };

  return (
    <div>
      <p style={style}>{props.input}</p>
    </div>
  );
};

export default UserOutput;
