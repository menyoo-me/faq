const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/style.css',
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { importLoaders: 1} },
            'postcss-loader'
          ]
        })
      },{
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          minimize: true
        }
      }]
    }, {
      test: /\.(png|jpe?g|ico)/i,
      use: [{
          loader: 'url-loader',
          options: {
            name: './images/[name].[ext]',
            limit: 10000
          }
        },
        {
          loader: 'img-loader'
        }
      ]
    }]
  },
  plugins: [
    new ExtractTextPlugin('style.css', {
      disable: process.env.NODE_ENV === 'development'
    }),
    new HtmlWebPackPlugin({
      favicon: 'src/images/favicon.ico',
      template: 'src/index.html',
      filename: './index.html'
    })
  ]
};
