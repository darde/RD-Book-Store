var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: ['babel-polyfill', './src/js/index.jsx'],

  output: {
    path: './dist',
    filename: 'bundle.js'
  },

  devtool: 'source-map',

  module: {
    preLoaders: [
      { test: /\.jsx?$/, loader: 'eslint', exclude: /node_modules/ }
    ],
    loaders: [
      { test: /\.css$/, loader: "style!css" },
      { test: /\.less$/, loader: "style!css!less" },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel'
      },
      { test: /\.(jpe?g|png|gif|svg)$/i, loader: 'url?limit=10000!img?progressive=true' },
      { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
    ]
  },

  plugins: [
    new CopyWebpackPlugin([
      { from: './src/html/index.html' }
    ])
  ],

  eslint: {
    configFile: './.eslintrc.js',
    failOnWarning: false,
    failOnError: true,
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  },

  devServer: {
    inline: true,
    contentBase: './dist',
    port: 5000
  }
};
