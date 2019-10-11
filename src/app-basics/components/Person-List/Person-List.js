import React, { PureComponent } from "react";
import ErrorBoundary from "../ErrorBoundary/ErrorBoundary";
import Person from "./Person/Person";

export default class PersonList extends PureComponent {
  // static getDerivedStateFromProps(nextProps, prevState) {
  //   console.log("[Person-List.js] getDerivedStateFromProps");
  //   return prevState;
  // }

  // shouldComponentUpdate(nextProps, nextState) {
  //   console.log("[Person-List.js] shouldComponentUpdate");
  //   if (nextProps.persons !== this.props.persons) {
  //     return true;
  //   }
  //   return false;
  // }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("[Person-List.js] getSnapshotBeforeUpdate");
  }

  componentDidUpdate(prevProps, prevState) {
    console.log("[Person-List.js] componentDidUpdate");
  }

  componentWillUnmount() {
    console.log("[Person-List.js] componentWillUnmount");
  }

  render() {
    console.log("[Person-List.js] rendering");
    return this.props.persons.map((person, idx) => {
      return (
        <ErrorBoundary key={person.id}>
          <Person
            name={person.name}
            age={person.age}
            click={this.props.onDelete.bind(null, idx)}
            changed={event => this.props.onChange(event, person.id)}
          ></Person>
        </ErrorBoundary>
      );
    });
  }
}
