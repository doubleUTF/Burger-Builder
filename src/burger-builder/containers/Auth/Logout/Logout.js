import React, { Component } from "react";
import { connect } from "react-redux";
import { authLogout } from "../../../store/actions";
import { Redirect } from "react-router-dom";

class Logout extends Component {
  componentDidMount() {
    this.props.onLogout();
  }

  render() {
    return <Redirect to="/"></Redirect>;
  }
}

const mapDispatchToProps = dispatch => {
  return { onLogout: () => dispatch(authLogout()) };
};

export default connect(null, mapDispatchToProps)(Logout);
