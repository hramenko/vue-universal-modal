var fs = require('fs')
var path = require('path')
var chalk = require('chalk')
var rollup = require('rollup')
var babel = require('rollup-plugin-babel')
var uglify = require('rollup-plugin-uglify')
// var minify = require('uglify-es').minify;

var version = process.env.VERSION || require('../package.json').version
var author = process.env.VERSION || require('../package.json').author
var license = process.env.VERSION || require('../package.json').license

var banner =
  '/**\n' +
  ' * Vue-universal-slider v' + version + '\n' +
  ' * (c) ' + new Date().getFullYear() + ' ' + author + '\n' +
  ' * @license ' + license + '\n' +
  ' */\n'

rollup.rollup({
    entry: path.resolve(__dirname, '..', 'src/index.js'),
    plugins: [
      babel(),
      uglify()
    ]
})
.then(bundle => {
    return write(path.resolve(__dirname, '../dist/vue-universal-slider.js'), bundle.generate({
        format: 'umd',
        moduleName: 'vue-universal-slider'
    }).code)
})
.then(() => {
    console.log(chalk.green('\nAwesome! Vue-universal-slider v' + version + ' builded.\n'))
})
.catch(console.log)

function getSize (code) {
  return (code.length / 1024).toFixed(2) + 'kb'
}

function write (dest, code) {
  return new Promise(function (resolve, reject) {
    code = banner + code
    fs.writeFile(dest, code, function (err) {
      if (err) return reject(err)
      console.log(chalk.blue(dest) + ' ' + getSize(code))
      resolve()
    })
  })
}