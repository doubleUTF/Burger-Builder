import React, { Component } from "./node_modules/react";
import Validation from "./Validation";
import Char from "./Char";

class App2 extends Component {
  state = {
    inputValue: "Initial input"
  };

  handleInput = event => {
    this.setState({ inputValue: event.target.value });
  };

  handleRemoveChar = idx => {
    let charArray = this.state.inputValue.split("");
    charArray.splice(idx, 1);
    this.setState({ inputValue: charArray.join("") });
  };

  render() {
    const characters = this.state.inputValue.split("").map((char, idx) => {
      return (
        <Char
          value={char}
          remove={this.handleRemoveChar.bind(this, idx)}
          key={idx}
        ></Char>
      );
    });

    return (
      <div>
        <h1>Assignment 2</h1>
        <input
          onChange={this.handleInput}
          value={this.state.inputValue}
          autofocus="true"
        ></input>
        <p>{this.state.inputValue.length}</p>
        <Validation length={this.state.inputValue.length}></Validation>
        {characters}
      </div>
    );
  }
}

export default App2;
