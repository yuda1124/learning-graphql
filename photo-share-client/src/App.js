import React, { Component } from "react";
import Users from "./Users";
import Photos from "./Photos";
import PostPhoto from "./PostPhoto";
import NewUser from "./NewUser";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { gql } from "apollo-boost";
import Header from "./Header";

export const ROOT_QUERY = gql`
  query allUsers {
    totalUsers
    totalPhotos
    allUsers {
      ...userInfo
    }
    me {
      ...userInfo
    }
    allPhotos {
      id
      name
      url
    }
  }
  fragment userInfo on User {
    githubLogin
    name
    avatar
  }
`;

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            exact
            path="/"
            component={() => (
              <>
                <Header />
                <div style={{ display: "flex" }}>
                  <div style={{ flex: 8 }}>
                    <Photos />
                  </div>
                  <div style={{ flex: 2 }}>
                    <Users />
                    <NewUser />
                  </div>
                </div>
              </>
            )}
          />
          <Route path="/newPhoto" component={PostPhoto} />
        </Switch>
      </Router>
    );
  }
}

export default App;
