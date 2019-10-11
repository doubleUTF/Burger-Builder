import React, { useEffect, useRef, useContext } from "react";
import CockpitStyles from "./cockpit.module.css";
import AuthContext from "../../context/auth-context";

const Cockpit = props => {
  const toggleBtnRef = useRef(null);
  const authContext = useContext(AuthContext);
  console.log(authContext);

  useEffect(() => {
    console.log("[Cockpit.js useEffect]");
    // const timer = setTimeout(() => {
    //   alert("Saved data");
    // }, 1000);
    toggleBtnRef.current.click();
    return () => {
      // clearTimeout(timer);
      console.log("[Cockpit.js] cleanup work in useEffect");
    };
  }, []);

  useEffect(() => {
    console.log("[Cockpit.js 2nd useEffect]");
    return () => {
      console.log("[Cockpit.js] cleanup work in 2nd useEffect");
    };
  });
  let btnClass = null;

  if (props.showPersons) {
    btnClass = CockpitStyles.Red;
  }

  const classes = [];
  if (props.personsLength <= 2) {
    classes.push(CockpitStyles.red);
  }
  if (props.personsLength <= 1) {
    classes.push(CockpitStyles.bold);
  }

  return (
    <div>
      <h1>{props.title}</h1>
      <p className={classes.join(" ")}>This is really working!</p>
      <button
        ref={toggleBtnRef}
        className={btnClass}
        onClick={props.clickHandler}
      >
        Switch Name Button
      </button>
      <button onClick={authContext.login}>Login</button>
    </div>
  );
};

// export default Cockpit;
export default React.memo(Cockpit);
