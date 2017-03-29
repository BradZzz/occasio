const path = require("path");
const glob = require("glob");
const root = "./src/components";
const myWebpackConfig = require("./webpack.config");

const findComponents = dir => (
  () => glob.sync(path.resolve(__dirname, `${root}/${dir}/**/*.js`)).filter(module =>
    /\/index\.js$/.test(module) ? false : /\/[A-Z]\w*\.js$/.test(module)
  )
);

module.exports = {
  showCode: false,
  assetsDir: "./static/",
  highlightTheme: "material",
  template: "./styleguide/index.html",

  title: "Styleguide",
  sections: [
    { name: "Atoms", components: findComponents("atoms") },
    { name: "Molecules", components: findComponents("molecules") },
    { name: "Organisms", components: findComponents("organisms") },
    { name: "Templates", components: findComponents("templates") },
    { name: "Pages", components: findComponents("pages") }
  ],

  getExampleFilename(componentpath) {
    return `${path.dirname(componentpath)}/README.md`;
  },

  updateWebpackConfig(webpackConfig) {
    const include = path.join(__dirname, "src");

    webpackConfig.postcss = [...myWebpackConfig.postcss];

    webpackConfig.module.loaders.push(
      {
        test: /\.jsx?$/,
        include,
        loaders: ["babel"]
      },
      {
        test: /\.css$/,
        include,
        loaders: [
          "style",
          "css?modules&importLoaders",
          "postcss"
        ]
      }
    );

    return webpackConfig;
  }
};
