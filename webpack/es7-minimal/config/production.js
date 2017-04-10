const path = require("path");
const webpack = require("webpack");
const ChunkHashReplacePlugin = require("chunkhash-replace-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = function(env) {
  return {
    entry: ["babel-polyfill", "./src/index.js"],
    output: {
      filename: "[name].[chunkhash].js",
      path: path.resolve(__dirname, "../dist")
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
      new ChunkHashReplacePlugin({
        src: "src/index.html",
        dest: "dist/index.html",
      }),
      new ExtractTextPlugin({
        filename: "[name].[chunkhash].css",
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
      })
    ]
  };
};
