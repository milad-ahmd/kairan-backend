"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var fileupload_1 = require("../controllers/fileupload");
var user_1 = require("../controllers/user");
var router = express.Router();
var userCtrl = new user_1.default();
var uploadCtrl = new fileupload_1.default();
router.route('/image').post(userCtrl.jwtTokenValidation, uploadCtrl.upload);
exports.default = router;
//# sourceMappingURL=fileupload.js.map