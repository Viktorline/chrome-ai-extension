const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const ExtReloader = require('webpack-ext-reloader')

module.exports = {
  mode: 'development',
  entry: {
    main: './src/index.tsx',
    content: './src/content.tsx',
    background: './src/background.ts'
  },
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].js',
    clean: true
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ],
        include: path.resolve(__dirname, 'src')
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [{ from: 'public', to: '.' }]
    }),
    new ExtReloader({
      manifest: path.resolve(__dirname, 'public/manifest.json'),
      port: 9090,
      reloadPage: true,
      entries: {
        content: 'content',
        background: 'background',
        extensionPage: 'main'
      }
    })
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js']
  },
  devtool: 'source-map'
}
