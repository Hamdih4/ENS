import Server from './server';
import Mailer from './mailer';
import Logger from './logger';

let routes = require('./config/routes.json').routes;
let config = require('./config/main.json').main;

let server = new Server();
let mailer = new Mailer();
let log = new Logger(config.loglevel);

function onFailure (req) {
  log.debug('Sending Failure Email');
  mailer.sendNotification();
}

function onRegular (req) {
  log.debug('Sending Regular Email');
  mailer.sendNotification(null, true);
}

for (let index in routes) {
  let route = routes[index];

  log.debug('Exposing Route:', route.path);
  log.trace(route);

  server.addRoute(
    route.method,
    route.path,
    route.action === 'fail' ? onFailure : onRegular
  );
}

