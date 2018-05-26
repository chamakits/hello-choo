// server.js
// where your node app starts

// init project
// var express = require('express');
// var app = express();
// var twilio = require('twilio');
// var PNF = require('google-libphonenumber').PhoneNumberFormat;
// var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

var html = require('choo/html')
var choo = require('choo')

var app = choo()                    // 1.
app.route('/choo', (state, emit) => {   // 2.
  return html`
    <body>Hello humans</body>
  `
})

var dom = app.toString('/')         // 3.
console.log(dom)
