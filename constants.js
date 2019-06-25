var chalk  = require('chalk')
var path = require('path')

var csts = {
  PREFIX_MSG              : chalk.green('[Sura] '),
  PREFIX_MSG_ERR          : chalk.red('[Sura][ERROR] '),
  PREFIX_MSG_MOD          : chalk.bold.green('[Sura][Module] '),
  PREFIX_MSG_MOD_ERR      : chalk.red('[Sura][Module][ERROR] '),
  PREFIX_MSG_WARNING      : chalk.yellow('[Sura][WARN] '),
  PREFIX_MSG_SUCCESS      : chalk.cyan('[Sura] '),

  COMPONENT_PATH: path.resolve(__dirname, 'src/views'),
  VUE_FILE: 'main.vue',
  ENTRY_FILE: 'entry.js',

  repository: 'surahe/test_Deploy',
  
  SUCCESS_EXIT            : 0,
  ERROR_EXIT              : 1,
  CODE_UNCAUGHTEXCEPTION  : 1,
}


module.exports = csts