const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const commonsPlugin = new webpack.optimize.CommonsChunkPlugin('common');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const configPath = require('./config.json');

const entrances = {
    app: __dirname + "/widget/entry/app.js",
    admin: __dirname + "/widget/entry/admin.js",
};

const HtmlTpl = Object.keys(entrances).map(name => {
    return new HtmlWebpackPlugin({
        filename: configPath.paths + '/page/' + name + '.html',
        template: __dirname + "/pages/index.html",
        chunks: ["common", name],
        inject: true,
    })
});


module.exports = {
    entry: entrances,
    output: {
        path: __dirname + "/dist",
        filename: "[name].js",
        publicPath: configPath.url
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                use: {
                    loader: "babel-loader"
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    }, {
                        loader: "css-loader",
                        options: {
                            modules: false
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            limit: 8192
                        }
                    }
                ]
            }
        ]
    },
    devtool: 'eval-source-map',
    devServer: {
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        contentBase: __dirname + "/dist/[name].html",
        historyApiFallback: false,//不跳转
        inline: true,//实时刷新
        hot: true,
        host: '0.0.0.0',
        port: 3001
    },
    plugins: HtmlTpl.concat([
        commonsPlugin,
        new webpack.BannerPlugin('版权所有，翻版必究'),
        // new HtmlWebpackPlugin({
        //     template: __dirname + "/pages/index.html"
        // }),
        new webpack.HotModuleReplacementPlugin(),
        // new webpack.optimize.OccurrenceOrderPlugin(),
        // new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin("style.css"),
        // new CopyWebpackPlugin([
        //   {
        //     from: 'node_modules/monaco-editor/min/vs',
        //     to: 'vs',
        //   }
        // ])
    ]),
    //其它解决方案配置
    // resolve: {
    //     root: 'E:/github/flux-example/src', //绝对路径
    //     extensions: ['', '.js', '.json', '.scss'],
    //     alias: {
    //         AppStore : 'js/stores/AppStores.js',
    //         ActionType : 'js/actions/ActionType.js',
    //         AppAction : 'js/actions/AppAction.js'
    //     }
    // }
};
