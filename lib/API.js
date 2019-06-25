const path = require('path')
const fs = require('fs')

const inquirer = require('inquirer')
const shelljs = require("shelljs")
const Printer = require('@darkobits/lolcatjs')
const ora = require("ora")

const log = require('../lib/utils/log')
const cst = require('../constants')
const logo = require('../lib/utils/logo')
const { dotExistDirectoryCreate, generateFile, downloadTemplate } = require('../lib/utils/file')
const { vueTemplate, entryTemplate } = require('../lib/template/index')

class API {
  constructor(opts) {

  }

  logo () {
    console.log(Printer.default.fromString(logo))
  }

  init() {
    inquirer
      .prompt([
        {
          type: "text",
          message: "请输入文件夹名称",
          name: "dirname"
        }
      ])
      .then(answers => {
        const spinner = ora("downloading.....")
        spinner.start()
        downloadTemplate(cst.repository, answers.dirname).then(() => {
          spinner.succeed()
        })
      })
  }

  async add(dirname) {
    let componentPath = path.resolve(cst.COMPONENT_PATH, dirname)
    const vueFile = path.resolve(componentPath, cst.VUE_FILE)
    const entryFile = path.resolve(componentPath, cst.ENTRY_FILE)
    const hasComponentExists = fs.existsSync(componentPath)
  
    if (hasComponentExists) {
      log.error(`${dirname}页面组件已存在，请重新输入`)
      return
    } else {
      log.info(`正在生成 component 目录 ${componentPath}`)
      await dotExistDirectoryCreate(componentPath)
    }

    try {
      // 获取组件名
      if (dirname.includes('/')) {
        const inputArr = dirname.split('/')
        componentPath = inputArr[inputArr.length - 1]
      } else {
        componentPath = dirname
      }

      await generateFile(vueFile, vueTemplate(componentPath))

      await generateFile(entryFile, entryTemplate(componentPath))

      log.success('生成成功')
    } catch (e) {
      log.error(e.message)
    }
  }

}

module.exports = API