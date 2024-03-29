const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    common: './common/index.js',
    flux: './flux/index.js'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, './dist')
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react'],
            plugins: [
              [
                'import', {
                  libraryName: 'antd',
                  style: 'css'
                }
              ]
            ]
          }
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' }
        ]
      }
    ]
  },
  devServer: {
    hot: true
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.template.html'),
      filename: 'flux.html',
      chunks: ['flux']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.template.html'),
      filename: 'common.html',
      chunks: ['common'] 
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
};
