let baseConfig = require('./webpack.base.js');
const webpack = require('webpack');
let UglifyPlugin = webpack.optimize.UglifyJsPlugin;
let DefinePlugin = webpack.DefinePlugin;

baseConfig.plugins.push(new UglifyPlugin())
baseConfig.plugins.push(new DefinePlugin({
    "process.env": "production"
}))
module.exports = {
    ...baseConfig
}