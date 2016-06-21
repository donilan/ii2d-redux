var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var DEV = process.env.NODE_ENV !== 'production';
var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.NoErrorsPlugin(),
  new ExtractTextPlugin("app.css"),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  })
];
var entries = ['./src/client/index.js'];
var loaders = [
  {
    test: /\.js$/,
    loaders: process.env.NODE_ENV === 'production' ? ['babel'] : ['react-hot', 'babel'],
    exclude: /node_modules/
  },
  {
    test: /\.(png|jpg|ttf|eot|svg|woff2|woff)$/,
    loader: 'url?limit=25000'
  },
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style', 'css!sass')
  }
];

if(DEV) {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  entries.push('webpack-hot-middleware/client?reload=true');
} else {
  plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));
}

module.exports = {
  devtool: DEV ? 'eval' : false,
  entry: entries,
  output: {
    path: path.join(__dirname, 'public/dist/'),
    filename: 'app.js',
    publicPath: '/dist/'
  },
  module: {loaders: loaders},
  plugins: plugins,
};
