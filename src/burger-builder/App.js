import React, { Component, Fragment, lazy, Suspense } from "react";
import Layout from "./containers/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
// import Checkout from "./containers/Checkout/Checkout";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// import Orders from "./containers/Orders/Orders";
import { connect } from "react-redux";
// import Auth from "./containers/Auth/Auth";
import Logout from "./containers/Auth/Logout/Logout";
import { authCheckState } from "./store/actions";
import Spinner from "./components/UI/Spinner/Spinner";

const Checkout = lazy(() => import("./containers/Checkout/Checkout"));
const Orders = lazy(() => import("./containers/Orders/Orders"));
const Auth = lazy(() => import("./containers/Auth/Auth"));

class App extends Component {
  componentDidMount() {
    this.props.onAuthCheck();
  }

  render() {
    let authRoutes = this.props.isAuth && (
      <Fragment>
        <Route
          path="/checkout"
          render={props => (
            <Suspense fallback={<Spinner></Spinner>}>
              <Checkout {...props}></Checkout>
            </Suspense>
          )}
        ></Route>
        <Route
          path="/orders"
          render={props => (
            <Suspense fallback={<Spinner></Spinner>}>
              <Orders {...props}></Orders>
            </Suspense>
          )}
        ></Route>
        <Route path="/logout" component={Logout}></Route>
      </Fragment>
    );
    return (
      <BrowserRouter basename="/Burger-Builder">
        <Layout>
          {this.props.authInit && (
            <Switch>
              <Route
                path="/auth"
                render={props => (
                  <Suspense fallback={<Spinner></Spinner>}>
                    <Auth></Auth>
                  </Suspense>
                )}
              ></Route>
              <Route path="/" exact component={BurgerBuilder}></Route>
              {authRoutes}
              <Redirect to="/"></Redirect>
            </Switch>
          )}
        </Layout>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuth: !!state.auth.token,
    authInit: state.auth.authInit
  };
};

const mapDispatchToProps = dispatch => {
  return { onAuthCheck: () => dispatch(authCheckState()) };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
