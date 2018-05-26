// server.js
var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({extended: true}));


app.use(express.static('public'));
app.get("/", function (request, response) {
    response.sendFile(__dirname + '/views/index.html');
});

var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});

var html = require('choo/html');
var choo = require('choo');

var chooApp = choo();
chooApp.route('/choo', (state, emit) => {
    return html`
    <body>Hello humans</body>
  `
})
chooApp.route('/base', base);
chooApp.route('/linkTo', linkTo);
chooApp.route('/form', form);

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

function form() {
    return html`
    <form id="login" action="/post-to" method="post">
        <label for="username">username</label>
        <input id="username" name="username" type="text">
        <label for="password">password</label>
        <input id="password" name="password" type="password">
        <input type="submit" value="Login">
    </form>
    `
}

var dom = chooApp.toString('/choo');

app.get("/choo", function (request, response) {
    response.send(dom);
});
app.get("/base", (request, response) => {
    response.send(chooApp.toString("/base"));
});
app.get("/form", (request, response) => {
    response.send(chooApp.toString("/form"))
});
app.post("/post-to", (request, response) => {
    console.log(`Request body: ${JSON.stringify(request.body)}`);
    response.send("Ok");
});
console.log(dom);
