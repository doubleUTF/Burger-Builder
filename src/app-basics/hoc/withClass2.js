import React from "react";

const withClass2 = (WrappedComponent, className) => {
  return props => (
    <div className={className}>
      <WrappedComponent {...props}></WrappedComponent>
    </div>
  );
};

export default withClass2;
