import React, { Component } from "react";
import UserInput from "./UserInput";
import UserOutput from "./UserOutput";
import "./App-1.css";

export default class App2 extends Component {
  state = {
    userInput1: "TH3_J0K3R",
    userInput2: "null"
  };

  handleInput = event => {
    this.setState({ userInput2: event.target.value });
  };

  render() {
    return (
      <div className="AppClass">
        <h1>Assignment 1</h1>
        <UserInput
          onInput={this.handleInput}
          inputValue={this.state.userInput2}
        ></UserInput>
        <UserOutput input={this.state.userInput1}></UserOutput>
        <UserOutput input={this.state.userInput2}></UserOutput>
      </div>
    );
  }
}
