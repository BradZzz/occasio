/* eslint-disable */
const emoji = require("node-emoji");
const chalk = require("chalk");


exports.error = (content, exit = true) => {
  console.log(`${chalk.red(content)} ${emoji.get("broken_heart")}`);

  if (exit) {
    process.exit();
  }
};


exports.success = (title, content, exit = true) => {
  console.log(`${chalk.green(title)} ${emoji.get("heart")}

- - - - - - - - - - - - - - - - - - - - - - - -
${content}
- - - - - - - - - - - - - - - - - - - - - - - -
`);

  if (exit) {
    process.exit();
  }
};
