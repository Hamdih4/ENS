export default class Logger {

  debug (text, obj) {
    console.info(text);

    if (obj) console.trace(obj);
  }

  info (text) {
    console.info(text);
  }

}
