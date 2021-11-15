const MonacoEditorPlugin = require('monaco-editor-webpack-plugin')

module.exports = {
  chainWebpack: (config) => {
    config.module.rule('vue').use('iview').loader('iview-loader').options({ prefix: false })
  },

  configureWebpack: (config) => {
    const plugins = []
    plugins.push(
      new MonacoEditorPlugin({
        // https://github.com/Microsoft/monaco-editor-webpack-plugin#options
        // Include a subset of languages support
        // Some language extensions like typescript are so huge that may impact build performance
        // e.g. Build full languages support with webpack 4.0 takes over 80 seconds
        // Languages are loaded on demand at runtime
        languages: ['javascript', 'css', 'html', 'typescript', 'json'],
      })
    )
    config.plugins = [...config.plugins, ...plugins]
  },
}
