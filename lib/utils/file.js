const fs = require('fs')
const path = require('path')
const log = require('./log')
const downLoadGit = require('download-git-repo')

// 生成文件
function generateFile(path, data) {
  log.info(`正在生成文件 ${path}`)

  if (fs.existsSync(path)) {
    errorLog(`${path}文件已存在`)
    return
  }
  return new Promise((resolve, reject) => {
    fs.writeFile(path, data, 'utf8', err => {
      if (err) {
        errorLog(err.message)
        reject(err)
      } else {
        resolve(true)
      }
    })
  })
}

/**
 * 下载模板
 * @param {String} repository git地址，可github 项目简写为 owner/name or simply owner/
 * @param {String} projectName 项目路径
 */
function downloadTemplate(repository, projectName) {
  return new Promise((resolve, reject) => {
    downLoadGit(repository, projectName, function (err) {
      if (err) {
        log.error(err)
        return reject(err)
      }
      return resolve()
    })
  })
};

function dotExistDirectoryCreate(directory) {
  return new Promise((resolve) => {
    mkdirs(directory, function () {
      resolve(true)
    })
  })
}

// 递归创建目录
function mkdirs(directory, callback) {
  var exists = fs.existsSync(directory)
  if (exists) {
    callback()
  } else {
    mkdirs(path.dirname(directory), function () {
      fs.mkdirSync(directory)
      callback()
    })
  }
}

module.exports = {
  dotExistDirectoryCreate,
  mkdirs,
  generateFile,
  downloadTemplate
}
