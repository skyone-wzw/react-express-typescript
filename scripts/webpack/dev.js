const {merge} = require("webpack-merge");
const path = require("path");

const common = require("./common");
const {PROJECT_PATH, SERVER_HOST, SERVER_PORT} = require("./const");

module.exports = merge(common, {
    mode: "development",
    devtool: "cheap-module-source-map",
    output: {
        filename: "js/[name].js",
        path: path.resolve(PROJECT_PATH, "./dist"),
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [
                    "style-loader", "css-loader",
                ],
            },
        ],
    },
    devServer: {
        host: SERVER_HOST,
        port: SERVER_PORT,
        compress: true,
        open: true,
        hot: true,
        historyApiFallback: {
            disableDotRule: true,
            index: "/",
        },
        proxy: {
            "/api": {
                target: "http://localhost:9000/",
                logLevel: "silent",
                secure: false,
                changeOrigin: true,
                ws: true,
                xfwd: true,
                // If uncomment this, all client request should have header `Accept: application/json`
                // bypass: (req, res, proxyOptions) => {
                //     if (req.headers.accept.indexOf("html") !== -1) {
                //         return "/index.html";
                //     }
                // },
            },
        },
    },
});
