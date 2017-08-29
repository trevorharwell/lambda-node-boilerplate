/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');

module.exports = (options) => ({
  entry: options.entry,
  output: Object.assign({ // Compile into js/build.js
    libraryTarget: 'commonjs2',
    path: path.resolve(process.cwd(), 'build'),
  }, options.output), // Merge with env dependent settings
  externals: {
    'aws-sdk': 'aws-sdk',
  },
  module: {
    loaders: [{
      test: /\.js$/, // Transform all .js files required somewhere with Babel
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: options.babelQuery,
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader',
    }, {
      test: /\.html$/,
      loader: 'html-loader',
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }],
  },
  plugins: [].concat(options.plugins || []),
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: [
      '.js',
      '.jsx',
    ],
    mainFields: [
      'module',
      'jsnext:main',
      'main',
    ],
  },
  target: 'node',
  performance: options.performance || {},
});
