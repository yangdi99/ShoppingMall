let baseConfig = require('./webpack.base.js');
const webpack = require('webpack');
let DefinePlugin = webpack.DefinePlugin;
baseConfig.plugins.push(new DefinePlugin({
    "process.env":'"development"'
}))

module.exports = {
    ...baseConfig,
    devServer: {
        historyApiFallback: true,
        host: '169.254.200.20',
        inline: true,
        open: true,
        port: 3030,
        noInfo: true
    },
    devtool:"eval-source-map"//让错误指向源代码
}