const path = require("path");
const fetch = require("node-fetch");
const { uploadStream } = require("../lib");
const authorizeWithGithub = require("../lib").authorizeWithGithub;

module.exports = {
  async postPhoto(parent, args, { db, currentUser, pubsub }) {
    console.log("phoyo");
    if (!currentUser) {
      throw new Error("only an authorized user can post a photo");
    }
    let newPhoto = {
      ...args.input,
      userId: currentUser.githubLogin,
      created: new Date(),
    };
    const { insertedIds } = await db.collection("photos").insert(newPhoto);
    newPhoto.id = insertedIds[0];

    var toPath = path.join(
      __dirname,
      "..",
      "assets",
      "photos",
      `${newPhoto.id}.jpg`
    );

    const { stream } = await args.input.file;
    console.log(stream);
    await uploadStream(stream, toPath);

    pubsub.publish("photo-added", { newPhoto });

    return newPhoto;
  },
  async fakeUserAuth(parent, { githubLogin }, { db }) {
    let user = await db.collection("users").findOne({ githubLogin });

    if (!user) {
      throw new Error(`Cannot find user with githubLogin ${githubLogin}`);
    }

    return {
      token: user.githubToken,
      user,
    };
  },
  async addFakeUsers(parent, { count }, { db, pubsub }) {
    console.log(count);
    let randomUserApi = `https://randomuser.me/api/?result=${count}`;
    let { results } = await fetch(randomUserApi).then((res) => res.json());
    console.log(results);
    let users = results.map((r) => ({
      githubLogin: r.login.username,
      name: `${r.name.first} ${r.name.last}`,
      avatar: r.picture.thumbnail,
      githubToken: r.login.sha1,
    }));
    console.log(results);
    await db.collection("users").insert(users);
    users.forEach((user) => {
      console.log(user);
      pubsub.publish("user-added", { newUser: user });
    });
    return users;
  },
  async githubAuth(parent, { code }, { db, pubsub }) {
    console.log("here");
    let {
      message,
      access_token,
      avatar_url,
      login,
      name,
    } = await authorizeWithGithub({
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      code,
    });

    if (message) {
      throw new Error(message);
    }

    let latestUserInfo = {
      name,
      githubLogin: login,
      githubToken: access_token,
      avatar: avatar_url,
    };

    const {
      ops: [user],
    } = await db
      .collection("users")
      .replaceOne({ githubLogin: login }, latestUserInfo, { upsert: true });
    console.log(user);
    pubsub.publish("user-added", { newUser: user });
    return { user, token: access_token };
  },
};
