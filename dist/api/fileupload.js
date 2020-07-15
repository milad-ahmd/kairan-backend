"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var fileupload_1 = require("../controllers/fileupload");
var user_1 = require("../controllers/user");
var router = express.Router();
var userCtrl = new user_1.default();
var uploadCtrl = new fileupload_1.default();
router.route('/image').post(uploadCtrl.upload);
router.route('/video').post(uploadCtrl.uploadVideo);
router.route('/image').get(uploadCtrl.getAll);
router.route('/image').put(uploadCtrl.update);
router.route('/pdf').post(uploadCtrl.uploadPdf);
exports.default = router;
//# sourceMappingURL=fileupload.js.map