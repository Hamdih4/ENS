var cron = require('cron');
var mailer = require('nodemailer');

var cronJob;
var transporter;

var iteration = 0;
var delay = 30;
var mailerConfig = {
  service: 'gmail',
  auth: {
    user: 'att.sdk.m2x.dev.1@gmail.com',
    pass: '6haC=xj9<n/$](Sp'
  }
};

var contacts = [];

var mailOptions = {
  to: 'ha702t@gmail.com',
  subject: 'DVAS tests failed!',
  html: '<b>Failure Found</b>'
};

function notifyContacts() {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.info('Email error');
      console.trace(error);
    } else {
      console.info('Notification sent to contacts');
      console.trace(info);
    }
  });
}

function checkForFailures() {
  iteration+=1;

  console.info('check #', iteration);
  notifyContacts();
}

(function main() {

  console.log('ENS Server Started');
  console.info('Check every %d seconds', delay);

  cronJob = cron.job('*/' + delay + ' * * * * *', checkForFailures);
  transporter = mailer.createTransport(mailerConfig ,{
    debug: true
  });

  cronJob.start();

}());



