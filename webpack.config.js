const path = require('path');

module.exports = {
  entry: './src/reg.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
  
};
// module.exports = {
//     module: {
//       loaders: [
//         {
//           test: /\.json$/,
//           loader: 'json-loader'
//         }
//       ]
//     }
//   }