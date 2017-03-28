const GitHubApi = require("github");

const issues = require("./commands/issues");

const username = process.argv[2];
const password = process.argv[3];

var github = new GitHubApi({
    // optional
    // debug: true,
    protocol: "https",
    host: "api.github.com",
    headers: {
        "user-agent": "Git-Web" // GitHub is happy with a unique user agent
    },
    followRedirects: false, // default: true; there's currently an issue with non-get redirects, so allow ability to disable follow-redirects
    timeout: 5000
});

github.authenticate({
    type: "basic",
    username: username,
    password: password
});

// Decide command
const command = process.argv[4].toLowerCase();

// Execute command
if (command === "issue" || command === "issues") {
  issues(process.argv.slice(5), github);
}
