import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import AppBasics from "./app-basics/containers/App";
import App from "./burger-builder/App";
import registerServiceWorker from "./registerServiceWorker";
import BlogApp from "./http-app/App";
import RoutingApp from "./routing-practice/App";
import ReduxApp from "./redux-start/App";
import ReduxHW from "./redux-assignment-2-problem/App";
import ReactHooks from "./hooks-01-starting-project/App";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import bbReducer from "./burger-builder/store/reducers/burgerBuilder";
import orderReducer from "./burger-builder/store/reducers/order";
import authReducer from "./burger-builder/store/reducers/auth";
import thunk from "redux-thunk";

ReactDOM.render(<ReactHooks></ReactHooks>, document.getElementById("root"));

// const composeEnhancers =
//   process.env.NODE_ENV == "development"
//     ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
//     : null || compose;

// const rootReducer = combineReducers({
//   burgerBuilder: bbReducer,
//   order: orderReducer,
//   auth: authReducer
// });
// const store = createStore(
//   rootReducer,
//   composeEnhancers(applyMiddleware(thunk))
// );
// ReactDOM.render(
//   <Provider store={store}>
//     <App title="Burger Builder" />
//   </Provider>,
//   document.getElementById("root")
// );

// import authContext from "./app-basics/context/auth-context";

// ReactDOM.render(<ReduxApp></ReduxApp>, document.getElementById("root"));
// ReactDOM.render(<ReduxHW></ReduxHW>, document.getElementById("root"));
// ReactDOM.render(
//   <AppBasics title="Person Manager" />,
//   document.getElementById("root")
// );

// ReactDOM.render(<BlogApp title="Http App" />, document.getElementById("root"));

// ReactDOM.render(
//   <RoutingApp title="Routing App" />,
//   document.getElementById("root")
// );

registerServiceWorker();
