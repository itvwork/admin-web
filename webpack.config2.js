var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack=require('webpack');
module.exports = function() {
    return {
        "resolve": {
            "extensions": [
                ".ts",
                ".js",
                ".vue"
            ],
            "modules": [
                "./node_modules"
            ],
            "symlinks": true
        },
        entry: {
            index: './app/index.js',
            //api:'./app/index1.js'
            // polyfill: './app/other/polyfill.js',
            // jquery:'./app/other/jquery.js'
            //vendor: 'moment'
        },
        output: {
            filename: '[name].js',
            publicPath: '/style/admin/js/',
            path: path.resolve(__dirname, 'dist/style/admin/js/'),
        },
        module: {
            rules: [{
                    test: /\.vue$/,
                    loader: 'vue-loader',

                }, {
                    test: /\.css$/,
                    loader: 'css-loader'
                    // use: ExtractTextPlugin.extract({
                    //     fallback: "style-loader",
                    //     use: "css-loader"
                    // })
                }, {
                    test: /\.js/,
                    loader: 'babel-loader',
                    exclude: /(node_modules)/,
                    query: {
                        presets: ['es2015', 'stage-3']
                    }
                },
                {
                    test: /\.less$/,
                    loader: 'less-loader'
                },
                {
                    test: /\.(png|jpg|gif)$/,
                    loader: 'url-loader',
                    query: {
                        // 把较小的图片转换成base64的字符串内嵌在生成的js文件里
                        limit: 10000,
                        // 路径要与当前配置文件下的publicPath相结合
                        name:'../style/[name].[ext]?[hash:7]'
                    }
                },
                {
                    test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
                    loader: 'file-loader',
                    query: {
                        // 把较小的图标转换成base64的字符串内嵌在生成的js文件里
                        limit: 10000,
                        name:'../fonts/[name].[ext]?[hash:7]',
                        prefix:'font'
                    }
                }
            ]
        },
        plugins: [
            //new ExtractTextPlugin('../style/styles.css'),
            new webpack.optimize.UglifyJsPlugin({
              compress: {
                warnings: false
              }
            }),
            new webpack.DefinePlugin({
                'process.env': {
                    NODE_ENV: '"production"'
                }
            })

        ]

    }
}