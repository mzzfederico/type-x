const path = require("path");

module.exports = {
    entryPoints: [path.resolve(__dirname, "client", "src", "index.js")],
    outfile: path.resolve(__dirname, "client", "dist", "index.js"),
    tsconfig: path.resolve(__dirname, "tsconfig.json"),
    sourcemap: true,
    bundle: true,
    loader: {
        ".png": "dataurl"
    }
};