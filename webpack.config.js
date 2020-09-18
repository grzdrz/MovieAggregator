const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const pluginsOptions = [];

const pages = [
  { folder: 'index', pageName: 'index', isContainer: true },
];
pages.forEach((e) => {
  pluginsOptions.push(
    new HtmlWebpackPlugin({
      filename: `./${e.pageName}.html`,
      template: `./src/pages/${e.folder}/${e.pageName}.html`,
      inject: true,
      chunks: [e.pageName],
    }),
  );
});
pluginsOptions.push(new MiniCssExtractPlugin({
  filename: '[name].css',
}));
const entries = pages.reduce((obj, curEntry) => {
  obj[curEntry.pageName] = `./src/pages/${curEntry.folder}/${curEntry.pageName}${curEntry.isContainer ? '-container' : ''}.jsx`;
  return obj;
}, {});

module.exports = {
  entry: entries,

  output: {
    path: path.resolve(__dirname, 'bandle'),
    filename: '[name].js?v=[hash]',
  },

  plugins: pluginsOptions,

  devServer: {
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-react'],
          plugins: [
            ['@babel/plugin-proposal-class-properties', { loose: true }],
          ],
        },
      },
      {
        test: /\.(ttf|eot|woff|woff2|svg|png|jpg)$/,
        loader: 'file-loader',
        options: {
          name: '[path][name].[ext]',
        },
      },
      {
        test: /\.css$/,
        loaders: [
          {
            loader: 'style-loader',
          },
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        loaders: [
          {
            loader: 'style-loader',
          },
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
};
