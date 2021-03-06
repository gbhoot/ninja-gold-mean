var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var sesion = require('express-session')({
    secret: "sssssssssshhhh",
    autoSave: true,
    resave: true,
    saveUninitialized: true
});

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(sesion);

// Angular
app.use(express.static(path.join(__dirname, './public/dist/public')));

// Routes
require('./server/config/routes.js')(app);

app.listen(8000);