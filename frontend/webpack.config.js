const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const pages = [
  'index',
  'cart',
  'checkout-payment_success',
  'product',
];

const javaWebappPath = path.resolve(__dirname, '../Sweetast/src/main/webapp');
const contextPath = '/Sweetast/';

module.exports = {
  entry: './src/JS/all.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: contextPath,
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: { presets: ['@babel/preset-env'] },
        },
      },
      {
        test: /\.scss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: `${contextPath}`,
            },
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: true,
            },
          },
          'sass-loader',
        ],
      },
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]',
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|avif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]',
        },
      },
    ],
  },
  plugins: [
    ...pages.map(
      (page) =>
        new HtmlWebpackPlugin({
          template: `./public/${page}.html`,
          filename: `${page}.html`,
          chunks: ['main'],
          scriptLoading: 'defer',
        })
    ),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
    }),
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'dist'),
          to: javaWebappPath,
        },
        {
          from: path.resolve(__dirname, 'public'),
          to: javaWebappPath,
          globOptions: {
            ignore: ['**/*.html', '**/*.jsp'],
          },
        },
        {
          from: path.resolve(__dirname, 'public/components'),
          to: path.resolve(javaWebappPath, 'components'),
          noErrorOnMissing: true,
        },
        {
          from: path.resolve(__dirname, 'src/assets'),
          to: path.resolve(javaWebappPath, 'assets'),
          noErrorOnMissing: true,
        },
        {
          from: path.resolve(__dirname, 'public'),
          to: javaWebappPath,
          globOptions: {
            ignore: ['**/*.html'],
          },
          filter: (resourcePath) => resourcePath.endsWith('.jsp'),
        },
      ],
    }),
  ],
  devServer: {
    static: path.resolve(__dirname, 'dist'),
    port: 3000,
    open: true,
    hot: true,
    historyApiFallback: false,
  },
  resolve: {
    extensions: ['.js', '.scss'],
  },
  devtool: 'source-map',
};



