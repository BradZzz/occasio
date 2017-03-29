const path = require("path");
const rootPath = path.resolve(path.join(__dirname, "../../"));

module.exports = {
  rootPath,
  basePath: path.join(rootPath, "src")
};
