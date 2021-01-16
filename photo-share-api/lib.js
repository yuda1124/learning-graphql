const fs = require("fs");
const fetch = require("node-fetch");

const requestGithubToken = (credentials) =>
  fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(credentials),
  })
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(JSON.stringify(error));
    });
const requestGithubUserAccount = (token) => {
  console.log(token);
  return fetch(`http://api.github.com/user`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `bearer ${token}`,
    },
  })
    .then((res) => res.json())
    .catch((error) => {
      throw new Error(JSON.stringify(error));
    });
};
async function authorizeWithGithub(credentials) {
  console.log(credentials);
  const { access_token } = await requestGithubToken(credentials);
  console.log(access_token + "hihi");
  const githubUser = await requestGithubUserAccount(access_token);
  return { ...githubUser, access_token };
}

const uploadStream = (stream, path) => {
  console.log(stream);
  return new Promise((resolve, reject) => {
    stream
      .on("error", (error) => {
        if (stream.truncated) {
          fs.unlinkSync(path);
        }
        reject(error);
      })
      .on("end", resolve)
      .pipe(fs.createWriteStream(path));
  });
};
module.exports = { authorizeWithGithub, uploadStream };
