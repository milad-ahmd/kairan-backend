"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require('custom-env').env(true);
var bodyParser = require("body-parser");
var express = require("express");
var cookieParser = require('cookie-parser');
var morgan = require("morgan");
var mongoose = require("mongoose");
var path = require("path");
var session = require('express-session');
var fileUpload = require('express-fileupload');
require('dotenv').config();
var expressWinston = require('express-winston');
var winston = require('winston');
var routes_1 = require("./routes");
var app = express();
exports.app = app;
app.set('port', (process.env.PORT || 8080));
var cookieSecret = 'secretCookie';
app.use(cookieParser(cookieSecret));
app.use('/', express.static(path.join(__dirname, '../public')));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(session({ secret: 'SECRET' })); // session secret
app.use(fileUpload({
    limits: { fileSize: 20 * 1024 * 1024 },
}));
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,X-Requested-With,content-type,Authorization,*');
    next();
});
//logging system
app.use(expressWinston.logger({
    transports: [
        new (winston.transports.Console)(),
        new (winston.transports.File)({ filename: './logs/server' + ((process.env.pm_id) ? process.env.pm_id : '') + '.log' })
    ],
    meta: true,
    msg: function (req, res) {
        return 'sess:' + ((req.session) ? req.session.id : 'logged out') + ' > ' + req.method + ' ' + req.url + ' - body: ' + JSON.stringify(req.body);
    },
    expressFormat: false,
    colorize: true,
    ignoreRoute: function (req, res) {
        return false;
    } // optional: allows to skip some log messages based on request and/or response
}));
var mongodbURI;
mongodbURI = 'mongodb://milad:74626731@localhost:27017/sanay?authSource=admin';
// mongodbURI = 'mongodb://localhost:27017/sanay'
app.use(morgan('dev'));
mongoose.Promise = global.Promise;
var mongodb = mongoose.connect(mongodbURI);
mongodb
    .then(function (db) {
    console.log('Connected to MongoDB');
    routes_1.default(app);
    app.listen(app.get('port'), function () {
        console.log('Your Backend listening on port ' + app.get('port'));
    });
})
    .catch(function (err) {
    console.error(err);
});
//# sourceMappingURL=app.js.map