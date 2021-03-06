/* global process */
const {resolve} = require('path');
const webpack = require('webpack');

const PACKAGE_ROOT = resolve(__dirname, '.');
const ROOT = resolve(PACKAGE_ROOT, '../..');

const config = {
  resolve: {
    alias: {
      '@deck.gl/core': resolve(ROOT, 'node_modules/@deck.gl/core/src'),
      'mapbox-gl': resolve(PACKAGE_ROOT, 'src/mapbox-gl')
    }
  },

  module: {
    rules: [
      {
        // Compile ES2015 using babel
        test: /\.js$/,
        loader: 'babel-loader',
        include: ['src', 'utils', 'node_modules/react-map-gl'],
        options: {
          presets: ['es2015']
        }
      }
    ]
  }
};

const devConfig = Object.assign({}, config, {
  entry: resolve(PACKAGE_ROOT, 'test/index.js'),

  mode: 'development',

  devServer: {
    contentBase: resolve(PACKAGE_ROOT, 'test')
  },

  plugins: [
    new webpack.DefinePlugin({
      __MAPBOX_TOKEN__: JSON.stringify(process.env.MapboxAccessToken) // eslint-disable-line
    })
  ]
});

const prodConfig = Object.assign({}, config, {
  entry: resolve(PACKAGE_ROOT, 'src/index.js'),

  mode: 'production',

  output: {
    path: resolve(PACKAGE_ROOT, 'dist'),
    filename: 'deckgl.min.js'
  },

  devtool: ''
});

module.exports = env => (env ? devConfig : prodConfig);
