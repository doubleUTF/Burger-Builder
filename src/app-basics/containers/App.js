import React, { Component, Fragment } from "react";
import AppStyles from "./App.module.css";
import PersonList from "../components/Person-List/Person-List";
import Cockpit from "../components/Cockpit/Cockpit";
import withClass2 from "../hoc/withClass2";
import AuthContext from "../context/auth-context";

class App extends Component {
  constructor(props) {
    super(props);
    console.log("[App.js] constructor");
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("[App.js] get derived state from props, ", nextProps);
    return prevState;
  }

  componentDidMount() {
    console.log("[App.js] componentDidMount");
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log("[App.js] shouldComponentUpdate");
    return true;
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("[App.js] componentDidUpdate");
  }
  state = {
    persons: [
      { id: "asd", name: "David", age: 66 },
      { id: "haha", name: "Jh0n", age: 33 },
      { id: "dwed", name: "JacK0", age: 6126 }
    ],
    showPersons: false,
    showCockpit: true,
    changeCounter: 0,
    authenticated: false
  };

  nameChangedHandler = (event, id) => {
    const personIdx = this.state.persons.findIndex(p => p.id === id);
    const person = { ...this.state.persons[personIdx] };
    person.name = event.target.value;
    const persons = [...this.state.persons];
    persons[personIdx] = person;
    this.setState((prevState, props) => {
      return {
        persons,
        changeCounter: prevState.changeCounter + 1
      };
    });
  };

  deletePersonHandler = idx => {
    const persons = [...this.state.persons];
    persons.splice(idx, 1);
    this.setState({ persons });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  toggleCockpit = () => {
    this.setState({ showCockpit: !this.state.showCockpit });
  };

  loginHandler = () => {
    this.setState({ authenticated: true });
  };
  render() {
    console.log("[App.js] render");
    let personListComponent = null;

    if (this.state.showPersons) {
      personListComponent = (
        <PersonList
          persons={this.state.persons}
          onDelete={this.deletePersonHandler}
          onChange={this.nameChangedHandler}
        />
      );
    }

    return (
      <Fragment>
        <button onClick={this.toggleCockpit}>Remove cockpit</button>
        <AuthContext.Provider
          value={{
            authenticated: this.state.authenticated,
            login: this.loginHandler
          }}
        >
          {this.state.showCockpit && (
            <Cockpit
              title={this.props.title}
              clickHandler={this.togglePersonsHandler}
              showPersons={this.state.showPersons}
              personsLength={this.state.persons.length}
            ></Cockpit>
          )}
          {personListComponent}
        </AuthContext.Provider>
      </Fragment>
    );
  }
}

export default withClass2(App, AppStyles.App);
