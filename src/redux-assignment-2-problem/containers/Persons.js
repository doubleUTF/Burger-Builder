import React, { Component } from "react";
import { connect } from "react-redux";
import Person from "../components/Person/Person";
import AddPerson from "../components/AddPerson/AddPerson";
import * as actions from "../store/actions";

class Persons extends Component {
  personAddedHandler = (name, age) => {
    const newPerson = {
      id: Math.random(), // not really unique but good enough here!
      name,
      age
    };
    this.props.onAddPerson(newPerson);
  };

  render() {
    return (
      <div>
        <AddPerson personAdded={this.personAddedHandler} />
        {this.props.persons.map(person => (
          <Person
            key={person.id}
            name={person.name}
            age={person.age}
            clicked={() => this.props.onDeletePerson(person.id)}
          />
        ))}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    persons: state.persons
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddPerson: person =>
      dispatch({ type: actions.ADD_PERSON, value: person }),
    onDeletePerson: personId =>
      dispatch({ type: actions.DELETE_PERSON, value: personId })
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Persons);
