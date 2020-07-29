const path = require('path');

module.exports = {
    entry: './index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "ndn-js.js",
        library: "ndn-js",
        libraryTarget: "umd"
    },
    target: "node",
}