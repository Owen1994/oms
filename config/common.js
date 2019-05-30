const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const webpack = require('webpack');
const FilterWarningsPlugin = require('webpack-filter-warnings-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const cssmodules = require('./cssmodulesignore');
const menus = require('./systemmenus');

const BUILD_ARGVS = process.env.BUILD_ARGVS;

const createHtmlPage = (filename, chunks) => {
    return  new HtmlWebPackPlugin({
                title: 'ERP-有棵树',
                template: path.resolve(__dirname, "../src/index.html"),
                filename,
                inject: true,
                favicon: path.resolve(__dirname, "../favicon.ico"),
                chunks,
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true
                },
            });
}

const resolve = {
    extensions: ['.js', '.jsx', '.css', '.jpg', '.png', '.jpeg', '.gif'],
    alias: {
        '@': path.resolve(__dirname, '../src'),
        'util': path.resolve(__dirname, '../src/util'),
    }
}

const externals = {
    jquery: 'jQuery',
    lodash: '_'
}

const plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            'BUILD_ARGVS': JSON.stringify(BUILD_ARGVS)
        }
    }),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        _: 'lodash'
    }),
    new MiniCssExtractPlugin({
        filename: "statics/css/[name].[chunkhash:8].css",
        chunkFilename: "statics/css/[id].[chunkhash:8].css"
    }),
    new FilterWarningsPlugin({
        exclude: /\[mini-css-extract-plugin\]/
    }),
];

function createRule(name) {
    const flag = name === 'development' ? true : false;
    return [
        {
            test: /\.(js|jsx)$/,
            exclude: /node_modules/,
            include: [
                path.resolve(__dirname, "../src")
            ],
            use: {
                loader: "babel-loader?cacheDirectory=true"
            }
        },
        {
            test: /\.css$/,
            exclude: [cssmodules, ],
            use: [
                {
                    loader: MiniCssExtractPlugin.loader,
                },
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: flag ? true : false,
                        modules: true,
                        localIdentName: "[local]___[hash:base64:6]"
                    }
                }
            ]
        },
        {
            test: /\.css$/,
            include: cssmodules,
            use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: flag ? true : false,
                        }
                    }
                ]
        },
        {
            test: /\.(png|jpg|jpeg|gif)$/,
            loader: 'url-loader',
            query: {
                limit: 500,
                name: 'statics/images/[name].[hash:7].[ext]'
            }
        },
        {
            test: /\.(eot|ttf|woff|woff2|svg|svgz)$/,
            loader: 'url-loader',
            query: {
                limit: 500,
                name: 'statics/images/[name].[hash:7].[ext]'
            }
        }
    ]
}

const createHtmlAndEntrys = (allConfigs, currentValue) => {
    const {entry, htmlPlugins } = allConfigs;
    const directory = currentValue.directory;
    if (!entry[directory]) {
        entry[directory] = path.resolve(__dirname, currentValue.src);
        const htmlDirectory = `${directory}/index.html`;
        htmlPlugins.push(createHtmlPage(htmlDirectory,[directory]));    
    }
    return allConfigs;
}

const { entry, htmlPlugins } = menus.reduce(createHtmlAndEntrys, {entry: {}, htmlPlugins: []});

module.exports = {
    entry,
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: '/',
        filename: "statics/js/[name].[chunkhash:8].js",
        chunkFilename: 'statics/js/[id].[chunkhash:8].chunk.js',
    },
    resolve,
    module: {
        rules: createRule(process.env.TARGET)
    },
    externals,
    plugins: [
        ...htmlPlugins,
        ...plugins
    ]
};
