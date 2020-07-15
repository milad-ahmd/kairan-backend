"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var user_1 = require("../controllers/user");
var router = express.Router();
var userCtrl = new user_1.default();
router.route('/save').post(userCtrl.jwtTokenValidation, userCtrl.insert);
router.route('/update').put(userCtrl.jwtTokenValidation, userCtrl.editProfile);
router.route('/all').get(userCtrl.getAll);
router.route('/filter').get(userCtrl.jwtTokenValidation, userCtrl.getByFilter);
router.route('/get-one/:id').get(userCtrl.jwtTokenValidation, userCtrl.get);
router.route('/user').put(userCtrl.jwtTokenValidation, userCtrl.update);
router.route('/find/search').get(userCtrl.searchUserByEmail);
router.route('/get/info').get(userCtrl.jwtTokenValidation, userCtrl.getUserInfo);
router.route('/get/invitation-code').get(userCtrl.jwtTokenValidation, userCtrl.getUserInvitationCode);
router.route('/get-one/:id').get(userCtrl.jwtTokenValidation, userCtrl.get);
router.route('/multiple').put(userCtrl.updateAll);
// Users
router.route('/login').post(userCtrl.login);
router.route('/login/admin').post(userCtrl.loginAdmin);
router.route('/register').post(userCtrl.register);
router.route('/verify').post(userCtrl.verify);
router.route('/refreshToken').get(userCtrl.jwtTokenValidation, userCtrl.refreshToken);
router.route('/forgetPassword').post(userCtrl.forgetPassword);
router.route('/resetPassword').post(userCtrl.resetPassword);
exports.default = router;
//# sourceMappingURL=user.js.map