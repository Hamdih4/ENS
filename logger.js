let colors = require('colors');

let globalConfig = require('./config/global.json').global;

const levels = [
  'error',
  'warn',
  'info',
  'debug',
  'trace'
];

const endl = '\r\n';

function isMyLevel (myLevel, level) {

  if (levels.indexOf(myLevel) > levels.indexOf(level)) {
    return false;
  }

  return true;
}

function newline () {
  console.log('');
}

function isGlobalLevelHigher (level) {
  if (levels.indexOf(globalConfig.loglevel) > levels.indexOf(level) ) {
    return true; 
  }

  return false;
}

export default class Logger {

  constructor (level) {

    if (!level) level = 'error';

    if (isGlobalLevelHigher(level))
      level = globalConfig.loglevel;

    this.level = level;
  }

  debug (text, obj) {

    if (!isMyLevel('debug', this.level)) return;

    console.log(text.underline.cyan);

    if (obj) console.log(obj);

    newline();
  }

  info (text) {

    if (!isMyLevel('info', this.level)) return;

    console.info(text.green);
    newline();
  }

  title (text) {
    console.log(text.underline.bold);
    newline();
  }

  warn (text) {

    if (!isMyLevel('warn', this.level)) return;

    console.log(text.underline.yellow);
    newline();
  }

  error (text, obj) {
    console.info(text.bold.red);

    if (obj) console.trace(obj.red);
    newline();
  }

  trace (obj) {

    if (!isMyLevel('trace', this.level)) return;

    if (obj) console.trace(obj.magenta);
    newline();
  }

}

