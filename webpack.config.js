const path    = require('path');
const webpack = require('webpack');
const cwd     = process.cwd();
const plugins = [new webpack.NoErrorsPlugin()];
var devtool   = 'cheap-module-eval-source-map';

if (process.env.NODE_ENV === "production") {
  devtool = 'source-map';
  plugins.push(
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({ minimize: true }),
      new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
      })
  );
}
module.exports = {

  devtool: devtool,

  entry: {
    alphabet: './src/alphabet/entry.js'
  },

  output: {
    path: `${cwd}/bundles`,
    filename: "[name].js",
    sourceMapFilename: "[name].js.map"
  },

  devServer: {
    contentBase: `${cwd}/bundles`,
    port: 8081
  },

  plugins: plugins,

  resolve: {
      modulesDirectories: [`${cwd}/src`, 'node_modules'],
      extensions: ['', '.json', '.jsx', '.js'],
  },

  module: {
    loaders: [{
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        include: `${__dirname}/src`
    },
    {
        test: /\.less$/,
        loader: "style!css!less"
    }]
  }
};
