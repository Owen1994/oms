/**
 *作者: 黄建峰
 *功能描述:  *参数说明:
 *时间: 2019/1/11 14:55
 */
const webpack = require("webpack");
const merge = require('webpack-merge');
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const AutoDllPlugin = require('autodll-webpack4-plugin');


const common  = require('./common.js');

const vendors = [
    'react',
    'react-dom',
    'redux',
    'react-redux',
    'redux-thunk',
    'react-router-dom',
    'immutable',
    'axios',
    'react-viewer',
    'prop-types',
    'react-loadable',
];

const UglifyJsPluginconfig = new UglifyJsPlugin({
    cache: true,
    parallel: true,
    uglifyOptions: {
        compress: {
            warnings: false,
            drop_console: true,
            collapse_vars: true,
            reduce_vars: true,
        }
    }
});


module.exports = merge(common, {
    mode: 'production',
    stats: {
        colors: true,
        hash: true,
        timings: true,
        assets: false,
        chunks: false,
        chunkModules: false,
        modules: false,
        children: false,
    },
    plugins: [
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),
        new AutoDllPlugin({
            inject: true,
            filename: '[name]_[chunkhash:7].dll.js',
            path: 'statics/dll',
            plugins: [
                UglifyJsPluginconfig
            ],
            entry: {
                vendors,
            }
        }),
    ],
    optimization: {
        minimize: true,
        minimizer: [
            UglifyJsPluginconfig,
            new OptimizeCSSAssetsPlugin({
                cssProcessorOptions: {
                    safe: true,
                }
            })
        ],
        runtimeChunk: false,
        // splitChunks: {
        //     cacheGroups: {
        //         default: false,
        //         js: {
        //             test: /\.(js|jsx)$/,
        //             name: 'vendors',
        //             chunks: 'all',
        //             minChunks: 2,
        //             priority: -20,
        //             enforce: true
        //         },
        //     }
        // }
    }
});
