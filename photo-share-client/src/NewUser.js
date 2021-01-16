import React, { Component } from "react";
import { Subscription, withApollo } from "react-apollo";
import { ROOT_QUERY } from "./App";
import { gql } from "apollo-boost";
const LISTEN_FOR_USERS = gql`
  subscription {
    newUser {
      githubLogin
      name
      avatar
    }
  }
`;

class NewUser extends Component {
  componentDidMount() {
    let { client } = this.props;
    this.listenForUsers = client
      .subscribe({ query: LISTEN_FOR_USERS })
      .subscribe(({ data: { newUser } }) => {
        const data = client.readQuery({ query: ROOT_QUERY });
        data.totalUsers += 1;
        data.allUsers = [...data.allUsers, newUser];
        data.completed = true;
        client.writeQuery({ query: ROOT_QUERY, data });
      });
  }
  componentWillUnmount() {
    this.listenForUsers.unsubscribe();
  }

  render() {
    return (
      <div>
        <h3>Welcome!!</h3>
        <Subscription subscription={LISTEN_FOR_USERS}>
          {({ data, loading }) =>
            loading ? (
              <p> loading a new user ... </p>
            ) : (
              <div>
                <img src={data.newUser.avatar} alt="" />
                <h2>{data.newUser.name}</h2>
              </div>
            )
          }
        </Subscription>
      </div>
    );
  }
}

export default withApollo(NewUser);
