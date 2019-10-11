import React, { Component, Fragment } from "react";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import { connect } from "react-redux";

class Layout extends Component {
  state = {
    showSideDrawer: false
  };

  sideDrawerClosedHandler = () => {
    this.setState({ showSideDrawer: false });
  };

  sideDrawerToggleHandler = () => {
    this.setState(prevState => ({ showSideDrawer: !prevState.showSideDrawer }));
  };

  render() {
    return (
      <Fragment>
        <Toolbar
          opened={this.sideDrawerToggleHandler}
          isAuth={this.props.isAuth}
        ></Toolbar>
        <SideDrawer
          open={this.state.showSideDrawer}
          closed={this.sideDrawerClosedHandler}
          isAuth={this.props.isAuth}
        ></SideDrawer>
        <main className={classes.Content}>{this.props.children}</main>
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  };
};
export default connect(mapStateToProps)(Layout);
