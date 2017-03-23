import Logger from './logger';

let mailer = require('nodemailer');
let fs = require('fs');

let config = require('./config/mailer.json').mailer;
let contacts = require('./config/contacts.json').contacts;

let log = new Logger(config.loglevel);

let emailTemplateFile = './templates/email.html';
let emailTemplate = fs.readFileSync(emailTemplateFile, 'utf8');
let transporter;

function handleEmail (error, info) {

  if (error) {
    log.error('Error sending email!', error);
    return;
  }

  log.info('Email sent successfully');
}

function handleEmailTemplateFile (error, data) {

  if (error) {
    log.error('Error reading file!', error);
    return;
  }

  log.info('File read successfully');
}

export default class Mailer {

  constructor () {
    this.transporter = mailer.createTransport(config);

    this.emailOptions = {
        to: contacts.failure.toString(),
        subject: config.subject,
        html: emailTemplate
    };
  }

  sendNotification (content, isRegular) {

    if (isRegular) {
      log.info('Sending Regular Email');
      this.emailOptions.to = contacts.regular.toSring()
    }

    if (content) {
      log.debug('Found new content');
      log.trace('content', content);
      this.emailOptions.html = content;
    }

    log.debug('Sending email to contacts:', this.emailOptions.to);
    this.transporter.sendMail(this.emailOptions, handleEmail);
  }

}

