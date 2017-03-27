const GitHubApi = require("github");

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

github.issues.getAll({}).then(results => {
  // TODO: Who am i?
  console.log(`Issues currently assigned to `)
  results.data.forEach(item => {
    console.log(`${item.title}\n-> ${item.repository.name}`);
  });
}).catch(err => {
  console.error(err);
})
