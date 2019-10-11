import React, { Component, Fragment } from "react";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler";
import { connect } from "react-redux";
import {
  addIngredient,
  removeIngredient,
  initIngredients,
  purchaseInit,
  setAuthRedirectPath
} from "../../store/actions/index";
import axios from "../../axios-orders";

export class BurgerBuilder extends Component {
  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState(ingredients) {
    const sum = Object.keys(ingredients)
      .map(key => ingredients[key])
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  }

  purchaseHandler = () => {
    if (this.props.isAuth) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      ...this.props.ings
    };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    let orderSummary = null;

    let burger = this.props.error ? <p>Network error</p> : <Spinner></Spinner>;
    if (this.props.ings) {
      burger = (
        <Fragment>
          <Burger ingredients={this.props.ings}></Burger>
          <BuildControls
            ingredientAdded={this.props.onAddIng}
            ingredientRemoved={this.props.onDelIng}
            disabled={disabledInfo}
            price={this.props.total}
            purchasable={this.updatePurchaseState(this.props.ings)}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuth}
          ></BuildControls>
        </Fragment>
      );
      orderSummary = (
        <OrderSummary
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          ingredients={this.props.ings}
          price={this.props.total}
        ></OrderSummary>
      );
    }

    return (
      <Fragment>
        <Modal
          show={this.state.purchasing}
          modalClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Fragment>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    total: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: !!state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIng: ing => dispatch(addIngredient(ing)),
    onDelIng: ing => dispatch(removeIngredient(ing)),
    onInitIngredients: () => dispatch(initIngredients()),
    onInitPurchase: () => dispatch(purchaseInit()),
    onSetAuthRedirectPath: path => dispatch(setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
