import express from 'express';
import webpack from 'webpack';
import path from 'path';

const config = require('./webpack.config');
const compiler = webpack(config);
const app = express();

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  hot: true,
  publicPath: config.output.publicPath,
  historyApiFallback: true,
  headers: { 'Access-Control-Allow-Origin': '*' },
}));

app.use(require('webpack-hot-middleware')(compiler));
app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const server = app.listen(process.env.PORT || 3000, function (err) {
  if (err) {
    console.log(err);
  }
  const host = server.address().address;
  const port = server.address().port;
  console.log('Listening at http://%s:%s', host, port);
});
