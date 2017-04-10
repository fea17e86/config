var path = require("path");
var webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const wwwFolder = "../www";

module.exports = function (env) {
  return {
    entry: ["babel-polyfill", "./src/index.js"],
    devtool: "source-map",
    output: {
      path: path.join(__dirname, wwwFolder),
      filename: "[name].js",
      publicPath: "/www"
    },
    devServer: {
      contentBase: ".",
      headers: {
        "Access-Control-Allow-Origin": "*"
      },
      inline: true,
      historyApiFallback: true,
      port: 8888
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules)/,
          use: [{
            loader: "babel-loader",
            options: {
              presets: ["es2015", "stage-0"]
            }
          }]
        },
        {
          test: /\.css$/,
          use: ExtractTextPlugin.extract({
            use: "css-loader",
            fallback: "style-loader"
          })
        }
      ]
    },
    plugins: [
      new ExtractTextPlugin({
        filename: "[name].css",
        allChunks: true
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: "vendor",
        minChunks: function (module) {
          // this assumes your vendor imports exist in the node_modules directory
          return module.context && module.context.indexOf("node_modules") !== -1;
        }
      }),
      new webpack.optimize.CommonsChunkPlugin({
        // But since there are no more common modules between them we end up with just the runtime code included in the manifest file
        name: "manifest"
      }),
      new webpack.DefinePlugin({
        "process.env": {
          "NODE_ENV": JSON.stringify("debug")
        }
      })
    ],
    node: {
      fs: "empty"
    }
  }
};
