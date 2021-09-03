const path = require("path");

module.exports = {
    entryPoints: [path.resolve(__dirname, "client", "src", "index.js")],
    outfile: path.resolve(__dirname, "client", "dist", "index.js"),
    tsconfig: path.resolve(__dirname, "tsconfig.json"),
    sourcemap: true,
    bundle: true,
    define: {
        'process.env.ZOOM': 2,
        'process.env.TILE_SIZE': 16,
        'process.env.ROOM_WIDTH': 20,
        'process.env.ROOM_HEIGHT': 12,
    },
    loader: {
        ".png": "dataurl",
        ".json": "json"
    }
};