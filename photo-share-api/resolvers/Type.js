const { GraphQLScalarType } = require("graphql");

module.exports = {
  Photo: {
    id: (parent) => parent.id || parent._id,
    url: (parent) => {
      return `http://localhost:4000/img/photos/${parent.id || parent._id}.jpg`;
    },
    postedBy: (parent, args, { db }) => {
      return db.collection("users").findOne({ githubLogin: parent.userId });
    },
    taggedUsers: (parent) => {
      return tags
        .filter((tag) => tag.photoId === parent.id)
        .map((tag) => tag.userId)
        .map((userId) => users.find((u) => u.githubLogin === userId));
    },
  },
  User: {
    postedPhotos: (parent) => {
      return photos.filter((p) => p.githubUser === parent.githubLogin);
    },
    inPhotos: (parent) => {
      return tags
        .filter((tag) => tag.userId === parent.githubLogin)
        .map((tag) => tag.photoId)
        .map((photoId) => photos.find((p) => p.id === photoId));
    },
  },
  DateTime: new GraphQLScalarType({
    name: "DateTime",
    description: "A valid date time value.",
    parseValue: (value) => new Date(value),
    serialize: (value) => new Date(value).toISOString(),
    parseLiteral: (ast) => ast.value,
  }),
};
