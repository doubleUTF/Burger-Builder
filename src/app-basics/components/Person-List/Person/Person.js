import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import PersonStyle from "./Person.module.css";
import withClass2 from "../../../hoc/withClass2";
import AuthContext from "../../../context/auth-context";

class Person extends Component {
  constructor(props) {
    super(props);
    this.inputElRef = React.createRef();
  }

  static contextType = AuthContext;

  componentDidMount() {
    console.log(this.context);
    this.inputElRef.current.focus();
  }

  render() {
    console.log("[Person.js] rendering");
    return (
      <Fragment>
        {this.context.authenticated ? (
          <p>Authenticated</p>
        ) : (
          <p>Please log in</p>
        )}
        <p onClick={this.props.click}>
          I'm <span className={PersonStyle.red}>{this.props.name}</span> and I
          am {this.props.age} years old!
        </p>
        <p>{this.props.children}</p>
        <input
          type="text"
          onChange={this.props.changed}
          value={this.props.name}
          ref={this.inputElRef}
        ></input>
      </Fragment>
    );
  }
}

Person.propTypes = {
  click: PropTypes.func,
  name: PropTypes.string,
  age: PropTypes.number,
  changed: PropTypes.func
};

export default withClass2(Person, PersonStyle.Person);
