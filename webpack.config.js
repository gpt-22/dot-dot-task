const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')


module.exports = {
  mode: 'development',

  entry: {
    main: './index.js'
  },

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  context: path.resolve(__dirname, 'src'),

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
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      template: 'index.html',
      minify: {
        collapseWhitespace: true
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css'
    })
  ],

  devServer: {
    port: 8080,
    contentBase: path.join(__dirname, 'src'),
    watchContentBase: true,
    hot: true
  }
}
