const path = require('path');
const decamelize = require('decamelize');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { flow } = require('lodash');
const { defaults, mapKeys, mapValues } = require('lodash/fp');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin } = require('webpack');
const postcssConfig = require('./postcss.config');
const babelConfig = require('./babel.config');

const { NODE_ENV = 'development' } = process.env;
const PROJECT_ROOT = path.resolve(__dirname, '..');

module.exports = env => ({
  mode: NODE_ENV,
  entry: path.resolve(PROJECT_ROOT, 'src', 'index.tsx'),
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  output: {
    path: path.resolve(PROJECT_ROOT, 'dist'),
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: NODE_ENV === 'production',
            },
          },
        ],
      },
      {
        test: {
          include: /\.css$/,
        },
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ...postcssConfig,
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.mcss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              modules: true,
              camelCase: true,
              localIdentName: NODE_ENV === 'production' ? '[hash:base64]' : '[local]--[hash:base64:5]',
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ...postcssConfig,
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: {
          include: /\.[jt]sx?$/,
          exclude: /node_modules/,
        },
        use: [
          {
            loader: 'babel-loader',
            options: babelConfig,
          },
        ],
      },
      {
        test: /\.ya?ml$/,
        use: [
          {
            loader: 'json-loader',
          },
          {
            loader: 'yaml-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(PROJECT_ROOT, 'src', 'index.pug'),
      minify: NODE_ENV === 'production',
      inject: false,
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new DefinePlugin(
      flow(
        defaults({
          serverUri: 'ws://127.0.0.1:9000',
        }),
        mapKeys(key => decamelize(key)),
        mapKeys(key => key.toUpperCase()),
        mapValues(value => JSON.stringify(value)),
      )(env),
    ),
  ],
  devServer: {
    historyApiFallback: true,
  },
  devtool: 'inline-source-map',
});
