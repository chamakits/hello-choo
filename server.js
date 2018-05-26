// server.js
// where your node app starts

// init project
// var express = require('express');
// var app = express();
// var twilio = require('twilio');
// var PNF = require('google-libphonenumber').PhoneNumberFormat;
// var phoneUtil = require('google-libphonenumber').PhoneNumberUtil.getInstance();

var express = require('express');
var appE = express();
appE.use(express.static('public'));
appE.get("/", function (request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

var listener = appE.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

var html = require('choo/html')
var choo = require('choo')

var app = choo()                    // 1.
app.route('/choo', (state, emit) => {   // 2.
  return html`
    <body>Hello humans</body>
  `
})
app.route('/base', base);
app.route('/linkTo', linkTo);

function base() {
  return html`
  <body>
    <h2>Base Header </h2>
    <a href="/linkto">
      Navigate To LinkTo
    </a>
  </body>
  `
}

function linkTo() {
  return html`
  <body><h2>LinkedTo</h2></body>
  `
}

var dom = app.toString('/choo')         // 3.

<<<<<<< HEAD
var dom = app.toString('/choo')         // 3.
=======
appE.get("/choo", function(request, response) {
  response.send(dom);
});
appE.get("/base", (request, response) => {
  response.send(app.toString("/base"));
});
>>>>>>> glitch
console.log(dom)
