import React, { Component } from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import Persons from "./containers/Persons";
import reducer from "./store/reducer";

const store = createStore(reducer);
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <ol>
            <li>
              Turn this app into one which does NOT use local state (in
              components) but instead uses Redux
            </li>
          </ol>
          <Persons />
        </div>
      </Provider>
    );
  }
}

export default App;
