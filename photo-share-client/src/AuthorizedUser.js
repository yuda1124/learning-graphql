import React, { Component } from "react";
import { withRouter, NavLink } from "react-router-dom";
import Avatar from "./Avatar";
import { Query, Mutation, withApollo } from "react-apollo";
import { flowRight as compose } from "lodash";
import { gql } from "apollo-boost";
import { ROOT_QUERY } from "./App";

const GITHUB_AUTH_MUTATION = gql`
  mutation githubAuth($code: String!) {
    githubAuth(code: $code) {
      token
    }
  }
`;

const CurrentUser = ({ name, avatar, logout }) => (
  <div>
    <Avatar name={name} avatar={avatar} />
    <button onClick={logout}>logout</button>
    <NavLink to="/newPhoto">
      <button>Post Photo</button>
    </NavLink>
  </div>
);

const Me = ({ logout, requestCode, signingIn }) => (
  <Query query={ROOT_QUERY} fetchPolicy="cache-only">
    {({ loading, data }) => {
      return loading ? (
        <p>loading...</p>
      ) : data.me ? (
        <CurrentUser {...data.me} logout={logout} />
      ) : (
        <button onClick={requestCode} disabled={signingIn}>
          깃허브로 로그인
        </button>
      );
    }}
  </Query>
);

class AuthorizedUser extends Component {
  state = { signingIn: false };

  componentDidMount() {
    if (window.location.search.match(/code=/)) {
      this.setState({ signingIn: true });
      const code = window.location.search.replace("?code=", "");
      this.githubAuthMutation({ variables: { code } });
    }
  }

  requestCode() {
    var clientID = process.env.REACT_APP_CLIENT_ID;
    window.location = `https://github.com/login/oauth/authorize?client_id=${clientID}&scode=user`;
  }

  authorizationComplete = (cache, { data }) => {
    localStorage.setItem("token", data.githubAuth.token);
    this.props.history.replace("/");
    this.setState({ signingIn: false });
  };

  render() {
    return (
      <Mutation
        mutation={GITHUB_AUTH_MUTATION}
        update={this.authorizationComplete}
        refetchQueries={[{ query: ROOT_QUERY }]}
      >
        {(mutation) => {
          this.githubAuthMutation = mutation;
          return (
            <Me
              signingIn={this.state.signingIn}
              requestCode={this.requestCode}
              logout={() => {
                localStorage.removeItem("token");
                let data = this.props.client.readQuery({ query: ROOT_QUERY });
                data.me = null;
                data.completed = true;
                this.props.client.writeQuery({ query: ROOT_QUERY, data });
              }}
            />
          );
        }}
      </Mutation>
    );
  }
}

export default compose(withRouter, withApollo)(AuthorizedUser);
