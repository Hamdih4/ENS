import Logger from './logger';

let mailer = require('nodemailer');
let fs = require('fs');

let config = require('./config/mailer.json').mailer;
let contacts = require('./config/contacts.json').contacts;

let log = new Logger();

let emailTemplateFile = './templates/email.html';
let emailTemplate = fs.readFileSync(emailTemplateFile, 'utf8');
let transporter;

function handleEmail (error, info) {

  if (error) {
    log.debug('Error sending email!', error);
    return;
  }

  log.info('Email sent successfully');
}

function handleEmailTemplateFile (error, data) {

  if (error) {
    log.debug('Error reading file!', error);
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
      this.emailOptions.to = contacts.regular.toSring()
    }

    if (content) {
      this.emailOptions.html = content;
    }

    this.transporter.sendMail(this.emailOptions, handleEmail);
  }

}

