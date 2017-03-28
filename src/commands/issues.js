const GitHubApi = require("github");

module.exports = (instruction, github) => {
  // Select subcmmmand from instruction
  const subcommand = instruction[0].toLowerCase();

  if (subcommand === "show-all") {
    issuesAssignedToUser(github);
  }
}

function issuesAssignedToUser(github) {
  github.issues.getAll({}).then(results => {
    // TODO: Who am i?
    console.log(`Issues currently assigned to <user>`);
    results.data.forEach(item => {
      console.log(`${item.title}\n-> ${item.repository.name}`);
    });
  }).catch(err => {
    console.error(err);
  });
}
