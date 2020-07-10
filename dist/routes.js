"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = require("./api/user");
var fileupload_1 = require("./api/fileupload");
var category_1 = require("./api/category");
var meet_1 = require("./api/meet");
var meeting_1 = require("./api/meeting");
var timeSheet_1 = require("./api/timeSheet");
function setRoutes(app) {
    app.use('/api/user', user_1.default);
    app.use('/api/upload', fileupload_1.default);
    app.use('/api/category', category_1.default);
    app.use('/api/meet', meet_1.default);
    app.use('/api/meeting', meeting_1.default);
    app.use('/api/time-sheet', timeSheet_1.default);
}
exports.default = setRoutes;
//# sourceMappingURL=routes.js.map