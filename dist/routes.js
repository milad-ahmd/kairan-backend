"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("./api/user");
var fileupload_1 = require("./api/fileupload");
var category_1 = require("./api/category");
var meet_1 = require("./api/meet");
var meeting_1 = require("./api/meeting");
function setRoutes(app) {
    app.use('/api/user', user_1.default);
    app.use('/api/upload', fileupload_1.default);
    app.use('/api/category', category_1.default);
    app.use('/api/meet', meet_1.default);
    app.use('/api/meeting', meeting_1.default);
}
exports.default = setRoutes;
//# sourceMappingURL=routes.js.map