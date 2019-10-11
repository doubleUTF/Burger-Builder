import React, { Fragment, Component } from "react";

import Modal from "../components/UI/Modal/Modal";

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    componentWillMount() {
      this.reqInt = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });

      this.resInt = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error });
        }
      );
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.reqInt);
      axios.interceptors.response.eject(this.resInt);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };

    render() {
      return (
        <Fragment>
          <Modal
            modalClosed={this.errorConfirmedHandler}
            show={this.state.error}
          >
            {this.state.error && this.state.error.message}
          </Modal>
          <WrappedComponent {...this.props}></WrappedComponent>
        </Fragment>
      );
    }
  };
};

export default withErrorHandler;
