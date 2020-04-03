const { resolve } = require('path')
const { existsSync, mkdirSync, writeFileSync } = require('fs')

const rimraf = require('rimraf')
const babel = require('babel-core')

const webpack = require("webpack")
const CopyWebpackPlugin = require('copy-webpack-plugin')

// generate babel helpers source
const helpersDirPath = resolve(__dirname, './.babel-helpers-source')
const helpersFilePath = resolve(helpersDirPath, './index.js')
if (existsSync(helpersDirPath)) {
  rimraf.sync(helpersDirPath)
}
mkdirSync(helpersDirPath)
writeFileSync(helpersFilePath, babel.buildExternalHelpers(), { flag: 'wx' })

// if the size of resource is bigger than threshold,
// it will be splitted into additional file
// rather than bundle to javascript file
const resourceThreshold = 108192

// inject environment variables of server info
const { BUILD_PROFILE_NAME } = process.env
console.log(`[Profile] Building using *${BUILD_PROFILE_NAME}*`)

module.exports = {
  entry: {
    babel: helpersFilePath,
    app: ['./src/index.jsx']
  },

  output: {
    path: resolve(__dirname, './dist'),
    publicPath: '/'
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/i,
        exclude: [/node_modules/, helpersFilePath],
        loader: 'babel-loader',
        options: {}
      },
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader'
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        loader: 'url-loader',
        options: {
          limit: resourceThreshold,
          name: 'images/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)$/i,
        loader: 'url-loader',
        options: {
          limit: resourceThreshold,
          name: 'media/[name].[hash:8].[ext]'
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        loader: 'url-loader',
        options: {
          limit: resourceThreshold,
          name: 'fonts/[name].[hash:8].[ext]'
        }
      }
    ]
  },

  resolveLoader: {
    alias: {
      worker: 'workerize-loader?name=js/[hash:8]'
    }
  },

  resolve: {
    modules: [resolve(__dirname, 'src'), 'node_modules'],
    extensions: ['.js', '.jsx']
  },

  plugins: [
    new webpack.DefinePlugin(
      Object.assign(
        {},
        { DEBUG: process.env.NODE_ENV !== "production",
        ...(require(`./build-profile/${process.env.BUILD_PROFILE_NAME}.js`))
        },
        {
          APP_VERSION: JSON.stringify(require('./package.json').version),
          GIT_COMMIT_HASH: JSON.stringify(
            process.env.GIT_COMMIT_HASH || 'unknown_git_commit_hash'
          )
        }
      )
),
    new CopyWebpackPlugin([
      {
        from: resolve(__dirname, './static'),
        to: 'static',
        ignore: ['.*']
      }
    ])
  ]
}
