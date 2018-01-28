const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const PROD = process.env.PROD_ENV !== undefined;

const html = new HtmlWebpackPlugin({
    template: 'static/index.html',
    filename: 'index.html'
})

const extractStyle = new ExtractTextPlugin({
    filename: "css/style.css"
});

const compress_js = new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
});

const compress_css = new OptimizeCssAssetsPlugin();


module.exports = {
    entry: './src/index.js',
    output: {
        filename: 'js/bundle.js',
        path: path.resolve(__dirname, "../backend/public"),
        publicPath: ''
    },
    module: {
        rules: [{
            test: /\.html$/,
            loader: 'html-loader'
        }, {
            test: /\.css$/,
            use: extractStyle.extract({
                use: ['css-loader']
            })
        }, {
            test: /\.scss$/,
            use: extractStyle.extract({
                use: [{
                    loader: "css-loader"
                }, {
                    loader: "sass-loader"
                }]
            })
        }, {
            test: /\.(png|svg|jpg|gif)$/,
            use: [
                'file-loader?name=/img/[name].[ext]'
            ]
        }, {
            test: /\.(woff|woff2|eot|ttf|otf)$/,
            use: [
                'file-loader?name=/font/[name].[ext]'
            ]
        },
        {
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }
    ]},
    plugins: PROD ?
        [ extractStyle, html, compress_js, compress_css ] :
        [ extractStyle, html ]
}