/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */

const CopyWebpackPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const path = require('path');

const configuration = {
  cssOutput: {
    filename: '[name].css',
    chunkFilename: '[name].chunk.css',
  },
};

module.exports = (_env, args) => {
  const isProduction = args && args['mode'] === 'production';

  const config = {
    entry: {
      main: path.resolve('./src/index.tsx'),
    },
    output: {
      path: path.resolve('./dist'),
    },

    target: 'web',
    devtool: isProduction ? false : 'source-map',

    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        // UPDATE: Absolute path
      },
    },

    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                transpileOnly: true,
              },
            },
          ],
        },
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [require('autoprefixer')],
                },
              },
            },
          ],
        },
        {
          test: /\.(svg|jpg|jpeg|png|gif)$/,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },

    watchOptions: {
      aggregateTimeout: 100,
      ignored: /node_modules/,
      poll: 300,
    },

    devServer: {
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
      static: {
        directory: path.join(__dirname, 'public'),
        publicPath: '/',
      },
      compress: process.env.NODE_ENV === 'production',
      port: 8000,
      historyApiFallback: true,
      hot: true,
      open: true,
    },

    optimization: {
      minimizer: [new CssMinimizerPlugin()],
    },

    plugins: [
      new ESLintPlugin({
        extensions: ['ts', 'tsx', 'js'],
      }),
      new webpack.EnvironmentPlugin({
        NODE_ENV: isProduction ? 'production' : 'development',
        DEBUG: !isProduction,
      }),
      new MiniCssExtractPlugin({
        filename: configuration.cssOutput.filename,
        chunkFilename: configuration.cssOutput.chunkFilename,
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: '**/*',
            to: path.resolve('./dist/'),
            context: './public/',
          },
        ],
      }),
    ],
  };

  return config;
};
