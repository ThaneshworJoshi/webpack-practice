const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpacakConfig = require('./webpack.development.config');

const compiler = Webpack(webpacakConfig);
const devServerOptions = { ...webpacakConfig.devServerOptions, open: true };
const server = new WebpackDevServer(devServerOptions, compiler);

const runServer = async () => {
  console.log('Starting server...');
  await server.start();
};

runServer();