var path = require('path');
var webpack = require('webpack');
var _ = require('lodash');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var plugins = [
  new webpack.optimize.OccurenceOrderPlugin(),
  new webpack.NoErrorsPlugin(),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify(process.env.NODE_ENV)
    }
  }),

];

var loaders = [
  {
    test: /\.js$/,
    loaders: process.env.NODE_ENV === 'production' ? ['babel'] : ['react-hot', 'babel'],
    exclude: /node_modules/
  },
  {
    test: /\.(png|jpg|ttf|eot|svg|woff2|woff)$/,
    loader: 'url?limit=25000'
  }
]

var webpackConfig = {
  devtool: false,
  output: {
    path: path.join(__dirname, 'public/javascripts/'),
    filename: 'app.js',
    publicPath: '/javascripts/'
  }
};

if (process.env.NODE_ENV === 'production') {
  plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));
  loaders.push({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style', 'css!sass')
  });
  webpackConfig = _.extend(webpackConfig, {
    entry : [
      './src/client/index.js'
    ],
    plugins : plugins
  });
} else {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  plugins.push(  new ExtractTextPlugin("app.css"));
  loaders.push({
    test: /\.scss$/,
    loader: 'style!css!sass'
  });
  webpackConfig = _.extend(webpackConfig, {
    devtool: 'eval',
    entry : [
      './src/client/index.js',
      'webpack-hot-middleware/client?reload=true'
    ],
    plugins: plugins
  });
}
webpackConfig.module = {loaders: loaders};
module.exports = webpackConfig;
