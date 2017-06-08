var path = require("path");

module.exports = {
    entry: ['./src/index.js'],
    output: {
        path: path.resolve(__dirname, 'public/js'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" }
        ]
    },
    devServer:{
        host: 'localhost',
        port: '3000',
        contentBase: path.resolve(__dirname, 'public'),
        stats: 'errors-only',
        historyApiFallback: true
    }
};