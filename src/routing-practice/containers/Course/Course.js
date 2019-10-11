import React, { Component } from "react";

class Course extends Component {
  state = {
    title: null
  };
  componentDidMount() {
    this.parseQueryParams();
  }
  componentDidUpdate(prevProps, prevState) {
    this.parseQueryParams();
  }

  parseQueryParams() {
    const query = new URLSearchParams(this.props.location.search);
    query.forEach(value => {
      if (this.state.title != value) {
        this.setState({ title: value });
      }
    });
  }

  render() {
    console.log(this.props);
    const id = this.props.match.params.id;
    return (
      <div>
        <h1>{this.state.title}</h1>
        <p>You selected the Course with ID: {id}</p>
      </div>
    );
  }
}

export default Course;
