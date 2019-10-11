import React, { Component } from "react";

import Counter from "./containers/Counter/Counter";
import "./App.css";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import counterReducer from "./store/reducers/counter";
import resultReducer from "./store/reducers/result";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  ctr: counterReducer,
  res: resultReducer
});

const logger = store => {
  return next => {
    return action => {
      console.log("Middleware Dispatching, action");
      const result = next(action);
      console.log("Middleware next state", store.getState());
      return result;
    };
  };
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(logger, thunk))
);

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Counter />
        </div>
      </Provider>
    );
  }
}

export default App;
