const path = require('path'),
  webpack = require("webpack"),
  libPath = path.join(__dirname, 'client'),
  wwwPath = path.join(__dirname, 'dist'),
  pkg = require('./package.json'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  CopyWebpackPlugin = require('copy-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  context: path.resolve(__dirname, './client'),
  entry: {
    app: path.join(libPath, '/app/app.module.js'),
    vendor: ['angular']
  },
  output: {
    path: path.join(wwwPath),
    filename: isDev ? 'bundle.js' : 'bundle.[hash].js',
    publicPath: '/'
  },

  module: {
    loaders: [{
      test: /\.html$/, loader: 'html-loader'
    }, {
      test: /\.(jpe?g|gif|png|wav|mp3|ico)$/, loader: "file-loader"
    }, {
      test: /\.scss$/, loader: 'style!css!sass'
    }, {
      test: /\.css$/, loader: 'style!css'
    }, {
      test: /\.js$/,
      exclude: /(node_modules)/,
      loader: "babel-loader",
      query: {
        presets: ['es2015']
      }
    }, {
      test: [/fontawesome-webfont\.svg/, /fontawesome-webfont\.eot/, /fontawesome-webfont\.ttf/, /fontawesome-webfont\.woff/, /fontawesome-webfont\.woff2/],
      loader: 'file?name=fonts/[name].[ext]'
    },
    { test: /\.(ttf|otf|eot|svg|woff(2)?)$/, loader: 'url' }]
  },
  devtool: isDev ? "inline-sourcemap" : "hidden-source-map",

  plugins: [
    new webpack.ProvidePlugin({
      'window.Masonry': 'Masonry'
    }),
    new webpack.optimize.CommonsChunkPlugin({/* chunkName= */name: "vendor", /* filename= */filename: isDev ? "vendor.js" : "vendor.[hash].js" }),

    //HtmlWebpackPlugin: Simplifies creation of HTML files to serve your webpack bundles : https://www.npmjs.com/package/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      pkg: pkg,
      template: path.join(libPath, 'index.ejs'),
      inject: true
    }),

    new CopyWebpackPlugin(!isDev ? [
      { from: './assets', to: 'assets' },
      { from: './favicon.ico' }
    ] : [])
  ]
};
