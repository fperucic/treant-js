const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  mode: 'development',
  target: "web",
  plugins: [  
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // all options are optional
      filename: "[name].css",
      chunkFilename: "[id].css",
      // ignoreOrder: false, // Enable to remove warnings about conflicting order
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: "./src/examples/basic-example/index.html",
      filename: "examples/basic-example/index.html",
      chunks: 'examples/basic-example'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin({
      patterns: [
        { from: "src/examples/headshots", to: "examples/headshots" }
      ],
    }),
  ],
  stats: {
    errorDetails: true,
    children: true,
  },
  entry: {
    // main: "./src/examples/basic-example/basic-example.ts",
    // "./src/examples/basic-example/basic-example.ts": path.resolve(__dirname, '/dist/examples/basic-example/main.js'),
    "examples/basic-example/main.js": path.resolve(__dirname, 'src/examples/basic-example/basic-example.ts'),
  },
  module: {
    rules: [
      // {
      //   test: require.resolve("Treant"),
      //   use: [
      //     { loader: "expose-loader"},
      //     {
      //       loader: "ts-loader",
      //       // options: {
      //       //   compilerOptions: {
      //       //     noEmit: false, // this option will solve the issue
      //       //     noImplicitAny: false
      //       //   },
      //       // },
      //     },
      //   ],
      //   options: {
      //     exposes: [
      //       {
      //         globalName: "Treant",
      //         moduleLocalName: "Treant",
      //       }
      //     ],
      //   }
      // },
      { test: /\.(png|jp(e*)g|svg|gif)$/, use: {
        loader: 'url-loader', // this need file-loader
        options: {
        limit: 50000
    } }
  },
      {
        test: /\.ts?$/,
        use: [
          {
            loader: "ts-loader",
            // options: {
            //   compilerOptions: {
            //     noEmit: false, // this option will solve the issue
            //     noImplicitAny: false
            //   },
            // },
          },
        ],
      },
      {
        test: /\.(sass|scss|css)$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
    alias: {
      eve: "eve-raphael/eve",
      jQuery: "jquery/src/jquery",
      $: "jquery/src/jquery",
    }
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    compress: true,
    port: 9000,
    hot: true,
  },
};
