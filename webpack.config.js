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
var entries = [ './src/client/index.js' ];
var loaders = [
  { test: /\.js$/, loaders: ['babel'], exclude: /node_modules/ },
  { test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/font-woff" },
  { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=application/octet-stream" },
  { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: "file" },
  { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: "url?limit=10000&mimetype=image/svg+xml" },
  { test: /\.(png|jpg)$/, loader: 'url?limit=25000' },
];

if(DEV) {
  plugins.push(new webpack.HotModuleReplacementPlugin());
  entries.unshift('webpack/hot/only-dev-server');
  entries.unshift('webpack-dev-server/client?http://localhost:' + (process.env.WEBPACK_PORT || '3001'));
  entries.unshift('react-hot-loader/patch');
  loaders.push({ test: /\.scss$/, loaders: ['style', 'css', 'sass'] });
} else {
  plugins.push(new webpack.optimize.UglifyJsPlugin({minimize: true}));
  plugins.push(new ExtractTextPlugin("app.css"));
  loaders.push({ test: /\.scss$/, loader: ExtractTextPlugin.extract('style', 'css!sass') });
}

module.exports = {
  devtool: DEV ? 'eval' : false,
  entry: entries,
  output: {
    path: path.join(__dirname, 'dist/'),
    filename: 'app.js',
    publicPath: DEV ? 'http://localhost:3001/dist' : '/dist/'
  },
  module: { loaders: loaders },
  plugins: plugins,
};
