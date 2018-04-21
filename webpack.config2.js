var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var webpack = require('webpack');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
module.exports = {
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
        vendor: ['./app/other/lrz.bundle.js', './app/other/polyfill.js', './app/other/fun.js']

        //api:'./app/index1.js'
        // polyfill: './app/other/polyfill.js',
        // jquery:'./app/other/jquery.js'
        //vendor: 'moment'
    },
    output: {
        filename: '[name].js',
        publicPath: '/style/admin/js/',
        path: path.resolve(__dirname, 'dist/style/admin/js/'),
        chunkFilename: '[name].[hash:5].js'

    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
            }, {
                test: /\.css$/,
                loader: 'css-loader'

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
                // use: ['style-loader', 'css-loader', 'less-loader', {
                //     loader: "postcss-loader",
                //     options: { // 如果没有options这个选项将会报错 No PostCSS Config found
                //         plugins: (loader) => [
                //             require('autoprefixer')(), //CSS浏览器兼容
                //         ]
                //     }
                // }]
                // loader: 'style-loader!css-loader!less-loader'

                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'less-loader', 'postcss-loader']
                })
                // use: ExtractTextPlugin.extract({
                //     fallback: 'style-loader',
                //     use: ['css-loader', 'less-loader', {
                //         loader: "postcss-loader",
                //         options: { // 如果没有options这个选项将会报错 No PostCSS Config found
                //             plugins: (loader) => [
                //                 require('autoprefixer')({
                //                     browsers: ['last 2 versions','Android >= 4.0','ie >= 9'],
                //                     remove:false,
                //                     add: false
                //                 }), //CSS浏览器兼容
                //             ]
                //         }
                //     }]
                // })
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                query: {
                    // 把较小的图片转换成base64的字符串内嵌在生成的js文件里
                    limit: 10000,
                    // 路径要与当前配置文件下的publicPath相结合
                    name: 'fonts/[name].[ext]?[hash:7]'
                }
            },
            {
                test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
                loader: 'url-loader',
                options: {
                    // 把较小的图标转换成base64的字符串内嵌在生成的js文件里
                    limit: 10000,
                    name: 'fonts/[name].[ext]?[hash:7]',
                    prefix: 'font'
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'index.css',
            allChunks: true
        })

        //         new webpack.optimize.UglifyJsPlugin({
        //             compress: {
        //                 warnings: false //
        //             }
        //         }),
        //         new webpack.DefinePlugin({
        //             'process.env': {
        //                 NODE_ENV: '"production"'
        //             }
        //         }),
        //
        //         new webpack.NoEmitOnErrorsPlugin()

    ]

}
