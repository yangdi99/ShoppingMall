let path = require('path');
let dir = process.cwd();//获取当前程序运行的目录

let baseConfig = {
    entry: {
        "bundle": dir + '/src/main'
    },
    output: {
        "path": dir + '/dist',
        "filename": "[name].js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: ['babel-loader']
            },
            {
                test: /\.css$/,
                use: ['style-loader','css-loader']
            },
            {
                test: /\.(eot|svg|woff|ttf)$/,
                use: ['url-loader']
            },
            {
                test: /\.(jpg|png|gif|jpeg)$/,
                use: ['url-loader']
            }
        ]
    },
    plugins: [],
    resolve: {
        extensions: ['.js','.jsx']
    }
}
module.exports = baseConfig;