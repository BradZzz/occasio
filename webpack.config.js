const path = require("path");
const webpack = require("webpack");
const CopyWebpackPlugin = require("copy-webpack-plugin");


module.exports = {
  debug: true,
  devtool: "#eval-source-map",

  entry: [
    "webpack/hot/dev-server",
    "webpack-hot-middleware/client",
    "./src/entry.js"
  ],

  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "/",
    filename: "js/bundle.js"
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new CopyWebpackPlugin([
      { from: "./static/" }
    ])
  ],

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: ["react-hot", "babel"]
      },
      {
        test: /\.css$/,
        loaders: [
          "style",
          "css?modules&importLoaders=1",
          "postcss"
        ]
      }
    ]
  },

  postcss: [
    require("postcss-import")({
      path: [
        "./node_modules",
        "./src/styles"
      ]
    }),
    require("postcss-url")(),
    require("postcss-cssnext")(),
    // more plugins...
    require("postcss-browser-reporter")(),
    require("postcss-reporter")()
  ]
};
