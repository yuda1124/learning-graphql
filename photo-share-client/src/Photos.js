import React from "react";
import { Query } from "react-apollo";
import { ROOT_QUERY } from "./App";

const Photos = () => (
  <Query query={ROOT_QUERY}>
    {({ loading, data }) => {
      return loading ? (
        <p>loading...</p>
      ) : (
        data.allPhotos.map((photo) => (
          <img
            key={photo.id}
            src={photo.url}
            alt={photo.name}
            width={"33.3%"}
          />
        ))
      );
    }}
  </Query>
);

export default Photos;
