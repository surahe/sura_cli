const chalk = require('chalk')

let logColor = {
  info: 'blue',
  success: 'green',
  warn: 'yellow',
  error: 'red',
}

let obj = {}

for(let index in logColor) {
  let item = logColor[index]
  obj[index] = function (msg) {
    console.log(chalk[item](`${msg}`))
  }
}

module.exports = obj
