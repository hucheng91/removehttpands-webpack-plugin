class RemoveHttpAndHttps {
    // eslint-disable-next-line no-useless-constructor
    constructor () {}
    apply (compiler) {
      compiler.plugin('emit', function (compilation, cb) {
        compilation.chunks.forEach(chunk => {
          chunk.files.forEach(function (filename) {
            let source = compilation.assets[filename].source()
            console.log(filename, source)
            const reg = new RegExp(/((https:\/\/|http:\/\/))/gm)
            source = source.replace(reg, '//')
            console.log(filename, source)
            compilation.assets[filename] = {
              source: () => source,
              size: () => source.length
            }
          })
        })
        cb()
      })
    }
  }
  
  module.exports = RemoveHttpAndHttps
  