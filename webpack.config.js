const webpack = require('webpack');
const helpers = require('./helpers');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

const ENV = process.env.ENV = process.env.NODE_ENV = 'development';
const HMR = helpers.hasProcessFlag('hot');

var metadata = {
  title: 'OPEN',
  baseUrl: '/',
  host: 'localhost',
  port: 3000,
  ENV: ENV,
  HMR: HMR
};
/*
 * Config
 * with default values at webpack.default.conf
 */
module.exports = {
  // static data for index.html
  metadata: metadata,
  devtool: 'cheap-module-eval-source-map',
  // cache: true,
  debug: true,
  // devtool: 'eval' // for faster builds use 'eval'

  // our angular app
  entry: {
    'polyfills': helpers.root('src/polyfills.ts'),
    'vendor': helpers.root('src/vendor.ts'),
    'app': helpers.root('src/app.ts'),
    'main-scripts': [
      helpers.root('node_modules/jquery/dist/jquery.min.js'),
      helpers.root('src/assets/js/jqueryelectron.js'),
      helpers.root('node_modules/bootstrap/dist/js/bootstrap.min.js')]
  },

  resolve: {
    extensions: ['', '.ts', '.js']
  },

  // Config for our build files
  output: {
    path: helpers.root('dist'),
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  module: {
    preLoaders: [
      // { test: /\.ts$/, loader: 'tslint-loader', exclude: [ helpers.root('node_modules') ] },
      // TODO(gdi2290): `exclude: [ helpers.root('node_modules/rxjs') ]` fixed with rxjs 5 beta.3 release
      { test: /\.js$/, loader: 'source-map-loader', exclude: [helpers.root('node_modules/rxjs')] }
    ],
    loaders: [
      // Support for .ts files.
      { test: /\.ts$/, loader: 'awesome-typescript-loader', exclude: [/\.(spec|e2e)\.ts$/] },

      // Support for *.json files.
      { test: /\.json$/, loader: 'json-loader' },

      // Support for CSS as raw text
      { test: /\.css$/, loader: 'style-loader!css-loader' },

      // support for .html as raw text
      { test: /\.html$/, loader: 'raw-loader', exclude: [helpers.root('src/index.html')] },

      // the url-loader uses DataUrls. // the file-loader emits files.
      { test: /\.(woff|woff2)(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
    ]
  },

  plugins: [
    new ForkCheckerPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(true),
    new webpack.optimize.CommonsChunkPlugin({ name: ['vendor', 'polyfills'], minChunks: Infinity }),
    // static assets
    new CopyWebpackPlugin([
      { from: 'src/assets', to: 'assets' },

      { from: 'src/app/components', to: 'app/components' },
      { from: 'src/app.html', to: 'app.html' },
      { from: 'src/main.js', to: 'main.js' },
      { from: 'src/package.json', to: 'package.json' },
      { from: 'src/app/shared/enums', to: 'app/shared/enums' },
      { from: 'src/app/shared/models', to: 'app/shared/models' },
      { from: 'src/app/shared/pipes', to: 'app/shared/pipes' },
      { from: 'src/app/shared/plugins', to: 'app/shared/plugins' },
      { from: 'src/app/shared/services', to: 'app/shared/services' },

      { from: 'backend', to: 'backend' },

      { from: 'node_modules/body-parser', to: 'node_modules/body-parser' },
      { from: 'node_modules/express', to: 'node_modules/express' },
      { from: 'node_modules/lowdb', to: 'node_modules/lowdb' },
      { from: 'node_modules/multer', to: 'node_modules/multer' },
      { from: 'node_modules/ms', to: 'node_modules/ms' },
      { from: 'node_modules/electron-squirrel-startup', to: 'node_modules/electron-squirrel-startup' }
    ]),
    // generating html
    new HtmlWebpackPlugin({ template: helpers.root('src/index.html'), chunksSortMode: 'none' }),
    // Environment helpers (when adding more properties make sure you include them in custom-typings.d.ts)
    new webpack.DefinePlugin({
      'ENV': JSON.stringify(metadata.ENV),
      'HMR': HMR
    })
  ],

  // Other module loader config

  // our Webpack Development Server config
  tslint: {
    emitErrors: false,
    failOnHint: false,
    resourcePath: 'src',
  },
  devServer: {
    port: metadata.port,
    host: metadata.host,
    historyApiFallback: true,
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  },
  node: {
    global: 'window',
    process: true,
    crypto: 'empty',
    module: false,
    clearImmediate: false,
    setImmediate: false
  }
};
