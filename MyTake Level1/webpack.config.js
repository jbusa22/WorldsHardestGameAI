const path = require('path');
 
module.exports = {
  entry: [path.resolve(__dirname, './sketch.js')],
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i, 
        loader: 'file-loader',
      }
      
    ]
  },
  resolve: {
    extensions: ['*', '.js'],
    fallback: {
      "path": false,
      "util": false,
      "crypto": false,
      "buffer": false,
      "https": false,
      "http": false,
      "vm": false,
      "os": false,
      "stream": false,
      "constants": false,
      "assert": false,
    }
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
  },
  externals: ["fs", "child_process", "worker_threads"],
};
