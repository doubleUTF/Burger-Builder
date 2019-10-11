import React from "./node_modules/react";

const CharComponent = prop => {
  const style = {
    display: "inline-block",
    padding: "16px",
    textAlign: "center",
    margin: "16px",
    border: "1px solid black"
  };

  return (
    <div style={style} onClick={prop.remove}>
      <h2>{prop.value}</h2>
    </div>
  );
};

export default CharComponent;
