import React, { Component } from "react";

class Avatar extends Component {
  render() {
    const { avatar, name } = this.props;
    return (
      <div style={{ display: "flex" }}>
        <img
          src={avatar}
          width={48}
          height={48}
          alt=""
          style={{ borderRadius: "50%", marginRight: "10px" }}
        />
        <p>{name}</p>
      </div>
    );
  }
}

export default Avatar;
