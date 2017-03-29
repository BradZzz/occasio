const browserSync = require("browser-sync");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackConfig = require("./webpack.config");
const bundler = webpack(webpackConfig);

browserSync({
  server: {
    baseDir: "dist",
    middleware: [
      webpackDevMiddleware(bundler, {
        publicPath: webpackConfig.output.publicPath,
        stats: { colors: true }
      }),
      webpackHotMiddleware(bundler)
    ]
  },
  files: [
    "dist/css/*.css",
    "dist/*.html"
  ],
  notify: false,
  open: false,
  ghostMode: false
});
