const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const PATHS = {
  src: path.join(__dirname, 'src'),
  dist: path.join(__dirname, 'dist')
}

module.exports = {
  target: 'web',

  mode: 'development',

  entry: {
    main: './index.js'
  },

  output: {
    filename: 'bundle.js',
    path: PATHS.dist
  },

  context: PATHS.src,

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          'style-loader', 
          {
            loader: MiniCssExtractPlugin.loader,
            options: { 
              esModule: false 
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[ext]'
        }
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: `${PATHS.src}/index.html`,
      filename: './index.html',
      minify: {
        collapseWhitespace: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: `${PATHS.src}/fonts`, to: 'fonts' }
      ]
    })
  ],

  devServer: {
    port: 8080,
    contentBase: PATHS.src,
    watchContentBase: true,
    hot: true
  }
}
