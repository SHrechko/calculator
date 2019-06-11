process.env.NODE_ENV = "development";

const fs = require("fs-extra");
const path = require("path");
const paths = require("react-scripts/config/paths");
const webpack = require("webpack");
const webpackconfig = require("react-scripts/config/webpack.config.js");
const config = webpackconfig(process.env.NODE_ENV);

// removes react-dev-utils/webpackHotDevClient.js at first in the array
config.entry = config.entry.filter(
  entry => !entry.includes("webpackHotDevClient")
);

//overriding webpack config
const customConfig = {
  path: paths.appBuild,
  hotUpdateChunkFilename: "hot/hot-update.js",
  hotUpdateMainFilename: "hot/hot-update.json"
};
config.output = { ...config.output, ...customConfig };

webpack(config).watch({}, (err, stats) => {
  if (err) {
    console.error(err);
  } else {
    copyPublicFolder();
  }
  console.error(
    stats.toString({
      chunks: false,
      colors: true
    })
  );
});

function copyPublicFolder() {
  fs.copySync(paths.appPublic, paths.appBuild, {
    dereference: true,
    filter: file => file !== paths.appHtml
  });
}
