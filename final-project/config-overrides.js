const webpack = require("webpack");

module.exports = function override(config) {
config.resolve.fallback = {
    ...config.resolve.fallback,
    buffer: require.resolve("buffer/"),
    timers: require.resolve("timers-browserify"),
};

config.plugins = [
    ...config.plugins,
    new webpack.ProvidePlugin({
    Buffer: ["buffer", "Buffer"],
    }),
];

return config;
};
