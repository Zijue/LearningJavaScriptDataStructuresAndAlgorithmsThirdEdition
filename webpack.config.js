const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: './src/index.ts',
    devtool: process.env.NODE_ENV === 'production' ? false : 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js'
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js', '.jsx'], // 自动补齐文件后缀
    },
    devServer: {
        port: 8888,
        open: true // 编译成功后，会自动打开浏览器进行预览
    },
    module: {
        rules: [
            {
                test: /\.[tj]sx?$/,
                use: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({ template: './src/index.html' }),
        new CleanWebpackPlugin({ cleanOnceBeforeBuildPatterns: ['**/*'] })
    ]
}