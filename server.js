// server.js
var express = require('express');
var app = express();
var fs = require('fs');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({extended: true}));

const TEMPLATE = {
    'EXAMPLE_FORM': 'templates/exampleForm.html',
    'BASE': 'templates/base.html',
    'LINK_TO': 'templates/linkTo.html'
};

function initTemplates() {
    let templatesToRead = [
        TEMPLATE.EXAMPLE_FORM, TEMPLATE.BASE, TEMPLATE.LINK_TO
    ];
    let templates = {};
    templatesToRead.forEach((curr) => {
        let fileReadString = fs.readFileSync(curr, 'utf8');
        templates[curr] = fileReadString;
    });
    return templates;
}

var templates = initTemplates();
var getTemplate = (toRetrieve) => {
    return () => {
        // console.log(templates[toRetrieve])
        return templates[toRetrieve];
    }
};

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
});

var sendChooTemplate = (chooPath) => {
    return (request, response) => {
        response.send(chooApp.toString(chooPath));
    };
};

chooApp.route('/base', getTemplate(TEMPLATE.BASE));
chooApp.route('/linkTo', getTemplate(TEMPLATE.LINK_TO));
chooApp.route('/form', getTemplate(TEMPLATE.EXAMPLE_FORM));

var dom = chooApp.toString('/choo');

app.get("/choo", function (request, response) {
    response.send(dom);
});
// app.get("/base", (request, response) => {
//     response.send(chooApp.toString("/base"));
// });
// app.get("/form", (request, response) => {
//     response.send(chooApp.toString("/form"))
// });
app.get("/base", sendChooTemplate("/base"));
app.get("/form", sendChooTemplate("/form"));
app.get("/linkTo", sendChooTemplate("/linkTo"));
app.post("/post-to", (request, response) => {
    console.log(`Request body: ${JSON.stringify(request.body)}`);
    response.send("Ok");
});
console.log(dom);
