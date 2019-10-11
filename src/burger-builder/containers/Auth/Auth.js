import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import AuthStyles from "./Auth.module.css";
import { auth } from "../../store/actions";
import { connect } from "react-redux";
import Spinner from "../../components/UI/Spinner/Spinner";
import { Redirect } from "react-router-dom";
import { setAuthRedirectPath } from "../../store/actions";
import { updateObject, checkValidation } from "../../shared/utility";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: { type: "email", placeholder: "Email" },
        value: "",
        validation: {
          required: true,
          isEmail: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: { type: "password", placeholder: "Password" },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignUp: false
  };

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  componentDidMount() {
    if (!this.props.isBuilding && this.props.authRedirectPath !== "/") {
      this.props.onSetAuthRedirectPath();
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidation(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      })
    });
    this.setState({ controls: updatedControls });
  };

  onSubmitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  render() {
    if (this.props.isAuth)
      return <Redirect to={this.props.authRedirectPath}></Redirect>;

    const formElements = [];
    for (let key in this.state.controls) {
      formElements.push({ id: key, config: this.state.controls[key] });
    }

    let form = this.props.loading ? (
      <Spinner></Spinner>
    ) : (
      formElements.map(formElement => {
        return (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            changed={event => this.inputChangedHandler(event, formElement.id)}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
          ></Input>
        );
      })
    );

    let errorMessage = this.props.error && <p>{this.props.error.message}</p>;
    return (
      <div className={AuthStyles.Auth}>
        {errorMessage}
        <form onSubmit={this.onSubmitHandler}>
          {form}
          <Button btnType="Success">Submit</Button>
        </form>
        <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
          Switch To {this.state.isSignUp ? "Sign In" : "Sign Up"}
        </Button>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: !!state.auth.token,
    isBuilding: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => {
      dispatch(auth(email, password, isSignUp));
    },
    onSetAuthRedirectPath: () => dispatch(setAuthRedirectPath("/"))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
