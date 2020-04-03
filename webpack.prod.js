const merge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CompressionPlugin = require('compression-webpack-plugin')

const baseConfig = require('./webpack.base')

baseConfig.entry.app.unshift('./src/polyfill.js')

module.exports = merge(baseConfig, {
  bail: true,
  mode: 'production',
  devtool: false,

  output: {
    filename: 'js/[name].[chunkhash:8].js',
    chunkFilename: 'js/[name].chunk.[chunkhash:8].js'
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.s(a|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[hash:8].css',
      chunkFilename: 'css/[id].[hash:8].css'
    }),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'src/index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
  }),

    new CompressionPlugin({
      asset: '[path].gz',
      test: /\.(html|css|js|eot|ttf|woff|svg|txt)$/i
    })
  ],

  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: false,
        parallel: true,
        uglifyOptions: {
          compress: {
            warnings: false,
            comparisons: false
          },
          output: {
            comments: false,
            ascii_only: false
          }
        }
      }),
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          safe: true
        }
      })
    ],

    splitChunks: {
      chunks: "all",
      minSize: 30000,
      minChunks: 2,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      name: true,
      cacheGroups: {
        babel: {
          name: 'babel',
          minSize: 0,
          test: /\.babel-helpers-source/,
          priority: 20
        },
        vendors: {
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'initial',
          priority: 10
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    },

    runtimeChunk: {
      name: 'runtime'
    }
  }
})
