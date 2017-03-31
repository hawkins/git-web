const fs = require("fs");
const homedir = require("homedir");

const configFilePath = `${homedir()}/.git-web.json`;

const getConfig = () => {
  // Load file and return parse, fallback to empty object
  var fileContents = "{}";
  try {
    fileContents = fs.readFileSync(configFilePath);
  } catch (err) {}
  return JSON.parse(fileContents);
};

const setConfig = properties => {
  // Load the config
  var config = getConfig();

  // Save new properties
  const props = Object.keys(properties);
  props.forEach(property => {
    config[property] = properties[property];
  });

  // Write new config object to file
  fileContents = JSON.stringify(config);
  fs.writeFileSync(configFilePath, fileContents);
};

const createAuthToken = github => {
  github.authorization.create(
    {
      scopes: ["user", "public_repo", "repo", "repo:status", "gist"],
      note: "git-web",
      note_url: "https://github.com/hawkins/git-web",
      headers: {
        "X-GitHub-OTP": "two-factor-code"
      }
    },
    (err, res) => {
      if (err) {
        // Probably already have a token
        console.error("Unable to create authentication token.");
      } else {
        setConfig({ auth: res.data.token });
        console.log("Saved authentication token");
      }
    }
  );
};

const login = (github, username) => {
  setConfig({ username });
  createAuthToken(github);
};

module.exports = { login, getConfig, setConfig, createAuthToken };
