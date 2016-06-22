var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var DEV = process.env.NODE_ENV !== 'production';
var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.NoErrorsPlugin(),
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

];

if(DEV) {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  entries.push('webpack-dev-server/client?http://localhost:3001');
  entries.push('webpack/hot/only-dev-server');
  loaders.push({
    test: /\.scss$/,
    loaders: ['style', 'css', 'sass']
  });
} else {
  plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));
  plugins.push(new ExtractTextPlugin("app.css"));
  loaders.push({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style', 'css!sass')
  });
}

module.exports = {
  devtool: DEV ? 'eval' : false,
  entry: entries,
  output: {
    path: path.join(__dirname, 'public/dist/'),
    filename: 'app.js',
    publicPath: DEV ? 'http://localhost:3001/dist' : '/dist/'
  },
  module: {loaders: loaders},
  plugins: plugins,
};
