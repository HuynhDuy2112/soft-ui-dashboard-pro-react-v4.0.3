/* const path = require('path')

module.exports = {
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'src/assets'),
    },
    extensions: ['.js', '.jsx', '.json'],
  },
}
 */

const JsconfigPathsPlugin = require('jsconfig-paths-webpack-plugin')

module.exports = {
  //other rules
  resolve: {
    plugins: [new JsconfigPathsPlugin()],
  },
}
