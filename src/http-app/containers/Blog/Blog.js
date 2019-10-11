import React, { Component, lazy, Suspense } from "react";
// import axios from "axios";
import { Route, NavLink, Switch, Redirect, withRouter } from "react-router-dom";

import "./Blog.css";
// import Posts from "../Posts/Posts";
// import NewPost from "../NewPost/NewPost";
import asyncComponent from "../../hoc/asyncComponent";

const AsyncNewPost = asyncComponent(() => {
  return import("../NewPost/NewPost");
});

const Posts = lazy(() => import("../Posts/Posts"));

class Blog extends Component {
  state = { auth: true };
  render() {
    console.log(this.props);
    return (
      <div className="Blog">
        <header>
          <nav>
            <ul>
              <li>
                <NavLink
                  to="/posts"
                  exact
                  activeClassName="my-active"
                  activeStyle={{
                    color: "#fa923f",
                    textDecoration: "underline"
                  }}
                >
                  Posts
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={{
                    pathname: "/new-post",
                    search: "?quick-submit=true",
                    hash: "#submit"
                  }}
                >
                  New Post
                </NavLink>
              </li>
            </ul>
          </nav>
        </header>
        <Switch>
          {this.state.auth && (
            <Route path="/new-post" component={AsyncNewPost}></Route>
          )}
          <Route
            path="/posts"
            render={props => (
              <Suspense fallback={<div>Loading...</div>}>
                <Posts {...props}></Posts>
              </Suspense>
            )}
          ></Route>
          <Route render={() => <h1>404 Not Found</h1>}></Route>
          {/* <Redirect from="/" to="/posts"></Redirect> */}
        </Switch>
      </div>
    );
  }
}

export default withRouter(Blog);
