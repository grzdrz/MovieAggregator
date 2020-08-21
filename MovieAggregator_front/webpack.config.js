const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const pluginsOptions = [];

const entries = [
    { pageName: "app" },
];
entries.forEach(e => {
    pluginsOptions.push(
        new HtmlWebpackPlugin({
            filename: `./${e.pageName}.html`,
            template: `./src/pages/base/${e.pageName}.html`,
            inject: true,
            chunks: [e.pageName],
        })
    )
});
pluginsOptions.push(new MiniCssExtractPlugin({
    filename: '[name].css',
}));

module.exports = {
    entry: { app: "./src/pages/base/app.js" },

    output: {
        path: path.resolve(__dirname, 'bandle'),
        filename: '[name].js?v=[hash]'
    },

    plugins: pluginsOptions,

    /* resolve: {
        extensions: [".ts", ".tsx", ".js"]
    }, */

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options: {
                    presets: ["@babel/preset-react"],
                    plugins: [
                        ["@babel/plugin-proposal-class-properties", { "loose": true }]
                    ]
                }
            },
            /* {
                test: /\.tsx?$/,
                use: "ts-loader",
            }, */
            {
                test: /\.(ttf|eot|woff|woff2|svg|png|jpg)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                }
            },
            {
                test: /\.css$/,
                loaders: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                    },
                ]
            },
            {
                test: /\.scss$/,
                loaders: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: "css-loader",
                    },
                    {
                        loader: "sass-loader"
                    },
                ]
            },
        ]
    },
}