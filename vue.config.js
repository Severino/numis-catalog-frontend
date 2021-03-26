const path = require("path")

module.exports = {
    publicPath: "/severin/",
    configureWebpack: {
        resolve: {
            alias: {
                "icons": path.resolve(__dirname, "node_modules/vue-material-design-icons")
            },
            extensions: [
                ".vue"
            ]
        }
    }
}