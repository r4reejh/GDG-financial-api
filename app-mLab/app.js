var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var port = process.env.PORT || 3000;
var index = require('./routes/index');
var app = express();
var companyDB = require('./config/database.js');

mongoose.connect(companyDB.url);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', index);

app.listen(port);

module.exports = app;
