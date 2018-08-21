require("babel-register");

const webpack = require('webpack');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin')
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const project = require('../project');

module.exports = {
  entry: {
    polyfills: project.src('polyfills.js'),
    app: project.src('app.js'),
  },
  output: {
    filename: '[name].js',
    path: project.dist(),
    publicPath: './',
  },
  resolve: {
    extensions: ['.hbs', '.html', '.ts', '.js', '.yaml', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(hbs|html)$/,
        loader: 'handlebars-loader',
        query: {
          helperDirs: [
            __dirname + '/helpers',
            project.src('views/helpers'),
          ],
          partialDirs: [
            project.src('views/partials')
          ]
        }
      },
      {
        test: /\.js$/,
        include: project.src(),
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          project.dev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader', options: {
              sourceMap: true,
              importLoaders: 2,
            },
          },
          // 'postcss-loader',
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              sourceMap: true,
              config: {
                path: './webpack/',
              },
              plugins: () => [
                require('autoprefixer')({}),
                require('cssnano')({}),
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
              fiber: require("fibers"),
              implementation: require("node-sass"),
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin([ './dist' ], {
      root: project.root(),
      verbose: true,
    }),
    new MiniCssExtractPlugin({
      filename: project.dev ? '[name].css' : '[name].[hash].css'
    }),
    // new webpack.HotModuleReplacementPlugin(),
    // new webpack.ResolverPlugin([
    //   new webpack.ResolverPlugin.FileAppendPlugin(['/dist/compiled-moduled.js'])
    // ]),

    // new FaviconsWebpackPlugin({
    //   // Your source logo
    //   logo: 'my-logo.png',
    //   // The prefix for all image files (might be a folder or a name)
    //   prefix: 'icons-[hash]/',
    //   // Emit all stats of the generated icons
    //   emitStats: false,
    //   // The name of the json containing all favicon information
    //   statsFilename: 'iconstats-[hash].json',
    //   // Generate a cache file with control hashes and
    //   // don't rebuild the favicons until those hashes change
    //   persistentCache: true,
    //   // Inject the html into the html-webpack-plugin
    //   inject: true,
    //   // favicon background color (see https://github.com/haydenbleasel/favicons#usage)
    //   background: '#fff',
    //   // favicon app title (see https://github.com/haydenbleasel/favicons#usage)
    //   title: 'Webpack App',

    //   // which icons should be generated (see https://github.com/haydenbleasel/favicons#usage)
    //   icons: {
    //     android: true,
    //     appleIcon: true,
    //     appleStartup: true,
    //     coast: false,
    //     favicons: true,
    //     firefox: true,
    //     opengraph: false,
    //     twitter: false,
    //     yandex: false,
    //     windows: false
    //   }
    // }),

    new WorkboxPlugin.GenerateSW({
      // these options encourage the ServiceWorkers to get in there fast
      // and not allow any straggling 'old' SWs to hang around
      clientsClaim: true,
      skipWaiting: true
    }),

    // Friendly webpack errors
    new FriendlyErrorsWebpackPlugin(),

    // prints more readable module names in the browser console on HMR updates
    new webpack.NamedModulesPlugin(),
  ],
};
