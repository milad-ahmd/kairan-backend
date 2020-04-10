"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("./api/user");
var client_1 = require("./api/client");
var news_1 = require("./api/news");
var manager_1 = require("./api/manager");
var product_1 = require("./api/product");
var programmingLang_1 = require("./api/programmingLang");
var services_1 = require("./api/services");
var team_1 = require("./api/team");
var fileupload_1 = require("./api/fileupload");
function setRoutes(app) {
    app.use('/api/user', user_1.default);
    app.use('/api/upload', fileupload_1.default);
    app.use('/api/client', client_1.default);
    app.use('/api/news', news_1.default);
    app.use('/api/manager', manager_1.default);
    app.use('/api/product', product_1.default);
    app.use('/api/programmingLang', programmingLang_1.default);
    app.use('/api/services', services_1.default);
    app.use('/api/team', team_1.default);
}
exports.default = setRoutes;
//# sourceMappingURL=routes.js.map