import React, { Component } from "react";
import {
  BrowserRouter,
  Route,
  NavLink,
  Switch,
  Redirect
} from "react-router-dom";
import Courses from "./containers/Courses/Courses";
import Users from "./containers/Users/Users";
import Course from "./containers/Course/Course";
import styles from "./App.module.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <ol style={{ textAlign: "left" }}>
            <li>
              Add Routes to load "Users" and "Courses" on different pages (by
              entering a URL, without Links)
            </li>
            <li>
              Add a simple navigation with two links => One leading to "Users",
              one leading to "Courses"
            </li>
            <li>
              Make the courses in "Courses" clickable by adding a link and load
              the "Course" component in the place of "Courses" (without passing
              any data for now)
            </li>
            <li>Pass the course ID to the "Course" page and output it there</li>
            <li>
              Pass the course title to the "Course" page - pass it as a param or
              score bonus points by passing it as query params (you need to
              manually parse them though!)
            </li>
            <li>
              Load the "Course" component as a nested component of "Courses"
            </li>
            <li>Add a 404 error page and render it for any unknown routes</li>
            <li>
              Redirect requests to /all-courses to /courses (=> Your "Courses"
              page)
            </li>
          </ol>
          <div>
            <NavLink
              to="/Users"
              style={{ marginRight: "1rem" }}
              activeClassName={styles.active}
            >
              User
            </NavLink>
            <NavLink to="/Courses" activeClassName={styles.active}>
              Courses
            </NavLink>
          </div>
          <Switch>
            <Route path="/Users" component={Users}></Route>
            <Route path="/Courses" component={Courses}></Route>
            <Redirect from="/all-courses" to="/Courses"></Redirect>
            <Route path="/" exact></Route>
            <Route render={() => <h1>404 Not Found</h1>}></Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
