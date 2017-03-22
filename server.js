import Logger from './logger';

let express = require('express');
let app = express();

let server = require('./config/server.json').server;

let log = new Logger();

export default class Server {

  constructor () {
    app.listen(server.port, function () {
      log.debug('ENS started on port:', server.port);
    });
  }

  addRoute (method, route, callback) {

    function onResponse (req, res) {
      callback(req);
      res.sendStatus(200);
    }

    if (!method ||
        method !== 'post') {

      app.get(route, onResponse);
      return;
    }

    app.post(route, onResponse);

  }

}

