import React, { Component } from "react";
import AuthorizedUser from "./AuthorizedUser";
class Header extends Component {
  render() {
    return (
      <div
        style={{
          width: "100%",
          height: "20%",
          display: "flex",
          padding: "20px",
          backgroundColor: "#008275",
          boxSizing: "border-box",
        }}
      >
        <h1>Photo Share</h1>
        <div style={{ marginLeft: "auto" }}>
          <AuthorizedUser />
        </div>
      </div>
    );
  }
}

export default Header;
