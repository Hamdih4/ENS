import Server from './server';
import Mailer from './mailer';

let routes = require('./config/routes.json').routes;

let server = new Server();
let mailer = new Mailer();

function onFailure(req) {
  mailer.sendNotification();
}

function onRegular(req) {
  mailer.sendNotification(null, true);
}

for (let route in routes) {
  server.addRoute(
    routes[route].method,
    routes[route].path,
    onFailure
  );
}

