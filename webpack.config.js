const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
        options: {
          presets: ['env', 'stage-2', 'react'],
          plugins: ['transform-class-properties'],
        },
      },
      {
        test: /\.css$/,
        include: [path.resolve(__dirname, 'src')],
        use: [MiniCssExtractPlugin.loader, { loader: 'css-loader' }],
      },
      {
        test: /\.html$/,
        include: [path.resolve(__dirname, 'src/index.html')],
        use: [
          {
            loader: 'html-loader',
            options: {
              minimize: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.json', '.css'],
    alias: {
      src: path.resolve(__dirname, './src'),
    },
  },
  devServer: {
    compress: true,
    contentBase: path.join(__dirname, 'public'),
    watchContentBase: true,
    hot: true,
    port: 9000,
    index: 'index.html',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, './src/index.html'),
      title: 'React boilerplate',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin(),
  ],
};
