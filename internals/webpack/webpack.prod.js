const slsw = require('serverless-webpack');

const entries = {};
Object.keys(slsw.lib.entries).forEach((name) => {
  entries[name] = ['babel-polyfill', slsw.lib.entries[name]];
});

module.exports = require('./webpack.base')({
  // In production, we skip all hot-reloading stuff
  entry: entries,

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: '[name].js',
  },
});
