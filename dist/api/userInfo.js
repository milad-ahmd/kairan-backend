"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var user_1 = require("../controllers/user");
var userInfo_1 = require("../controllers/userInfo");
var router = express.Router();
var userCtrl = new user_1.default();
var userInfoCtrl = new userInfo_1.default();
router.route('/save').post(userCtrl.jwtTokenValidation, userInfoCtrl.insert);
router.route('/update').put(userCtrl.jwtTokenValidation, userInfoCtrl.update);
router.route('/all').get(userInfoCtrl.getAll);
router.route('/filter').get(userInfoCtrl.getByFilter);
router.route('/get-one/:id').get(userInfoCtrl.get);
router.route('/multiple').put(userInfoCtrl.updateAll);
exports.default = router;
//# sourceMappingURL=userInfo.js.map