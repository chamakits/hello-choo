// server.js
const express = require('express');
const app = express();
const fs = require('fs');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(bodyParser.urlencoded({extended: true}));

const TEMPLATE = {
    'EXAMPLE_FORM': 'templates/exampleForm.html',
    'BASE': 'templates/base.html',
    'LINK_TO': 'templates/linkTo.html',
    'CHOO': 'templates/choo.html'
};

function initTemplates() {
    // let templatesToRead = [
    //     TEMPLATE.EXAMPLE_FORM, TEMPLATE.BASE, TEMPLATE.LINK_TO,
    //     TEMPLATE.CHOO
    // ];
    let templatesToRead = [];
    for (var key in TEMPLATE) {
        templatesToRead.push(TEMPLATE[key]);
    }

    let templates = {};
    templatesToRead.forEach((curr) => {
        let fileReadString = fs.readFileSync(curr, 'utf8');
        templates[curr] = fileReadString;
    });
    return templates;
}

const templates = initTemplates();
const getTemplate = (toRetrieve) => {
    return () => {
        return templates[toRetrieve];
    }
};

var html = require('choo/html');
var choo = require('choo');

var chooApp = choo();
var sendChooTemplate = (chooPath) => {
    return (request, response) => {
        response.send(chooApp.toString(chooPath));
    };
};

chooApp.route('/choo', getTemplate(TEMPLATE.CHOO));
chooApp.route('/base', getTemplate(TEMPLATE.BASE));
chooApp.route('/linkTo', getTemplate(TEMPLATE.LINK_TO));
chooApp.route('/form', getTemplate(TEMPLATE.EXAMPLE_FORM));

app.use(express.static('public'));
app.get("/", function (request, response) {
    response.sendFile(__dirname + '/views/index.html');
});
app.get("/choo", sendChooTemplate("/choo"));
app.get("/base", sendChooTemplate("/base"));
app.get("/form", sendChooTemplate("/form"));
app.get("/linkTo", sendChooTemplate("/linkTo"));
app.post("/post-to", (request, response) => {
    console.log(`Request body: ${JSON.stringify(request.body)}`);
    response.send("Ok");
});
var listener = app.listen(process.env.PORT, function () {
    console.log('Your app is listening on port ' + listener.address().port);
});