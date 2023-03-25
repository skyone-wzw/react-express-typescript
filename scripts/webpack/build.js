const {merge} = require("webpack-merge");
const path = require("path");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const common = require("./common");
const {PROJECT_PATH} = require("./const");

module.exports = merge(common, {
    mode: "production",
    devtool: false,
    output: {
        filename: "script/[name].[contenthash:8].js",
        path: path.resolve(PROJECT_PATH, "./build"),
    },
    optimization: {
        minimize: true,
        minimizer: [
            new CssMinimizerPlugin(),
            new TerserPlugin(),
        ],
        splitChunks: {
            chunks: "all",
            cacheGroups: {
                vendor: {
                    name: "vendor",
                    priority: 1,
                    test: /node_modules/,
                    minSize: 0,
                    minChunks: 1,
                },
                // Example for @mui
                // ui: {
                //     name: "ui",
                //     priority: 2,
                //     test: /[\\/]node_modules[\\/]@mui(.*)/,
                //     minSize: 0,
                //     minChunks: 1,
                // },

                // For reusable code
                // common: {
                //     name: "common",
                //     priority: 0,
                //     minSize: 0,
                //     minChunks: 2,
                // },
            },
        },
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    MiniCssExtractPlugin.loader, "css-loader",
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "style/[name].[contenthash:8].css",
        }),
        new CleanWebpackPlugin(),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(PROJECT_PATH, "public"),
                    to: path.resolve(PROJECT_PATH, "build"),
                    filter: (filepath) =>
                        path.resolve(filepath) !== path.resolve(PROJECT_PATH, "public/index.html"),
                },
            ],
        }),
    ],
});
