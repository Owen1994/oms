/**
 *作者: 黄建峰
 *功能描述:  *参数说明:
 *时间: 2019/1/11 14:55
 */
const merge = require('webpack-merge');
const path = require('path');
const common = require('./common.js');
const { proxy, historyApiFallback }  = require('./proxy');

module.exports = merge(common, {
    mode: 'development',
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                include: [
                    path.resolve(__dirname, "../src")
                ],
                use: ['eslint-loader']
            }
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "../dist"),
        compress: true,
        inline: true,
        port: 8282,
        historyApiFallback,
        proxy,
        openPage: 'login/',
    }
});
