// Important modules this config uses
const path = require('path');
const Bluebird = require('bluebird');
const fs = Bluebird.promisifyAll(require('fs'));

module.exports = require('./webpack.base')({
  // In production, we skip all hot-reloading stuff
  entry: async () => {
    const lambdaFolderPath = path.join(process.cwd(), 'src/lambda');

    const files = await fs.readdirAsync(lambdaFolderPath);

    const entry = {};

    files.forEach((filePath) => {
      const ext = path.extname(filePath);
      if (ext === '.js') {
        const name = filePath.slice(0, -ext.length);
        entry[name] = ['babel-polyfill', path.join(lambdaFolderPath, filePath)];
      }
    });

    return entry;
  },

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: '[name].js',
  },
});
