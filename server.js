import Logger from './logger';

let express = require('express');
let app = express();

let server = require('./config/server.json').server;
let globalConfig = require('./config/global.json').global;

let log = new Logger(server.loglevel);

export default class Server {

  constructor () {
    app.listen(server.port, function () {
      log.title(globalConfig.name + ' started on port: ' + server.port);
    });
  }

  addRoute (method, route, callback) {

    log.trace(method);
    log.trace(route);
    log.trace(callback);

    function onResponse (req, res) {
      log.debug('Received a request');

      callback(req);
      res.sendStatus(200);
    }

    if (!method ||
        method !== 'post') {

      log.warn('Route method was not defined, setting to default="get"');
      app.get(route, onResponse);
      return;
    }

    log.debug('Adding Route method of type="post"', route);
    app.post(route, onResponse);

  }

}

