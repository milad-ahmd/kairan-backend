"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var user_1 = require("../controllers/user");
var timeSheet_1 = require("../controllers/timeSheet");
var router = express.Router();
var userCtrl = new user_1.default();
var ctrl = new timeSheet_1.default();
router.route('/save').post(userCtrl.jwtTokenValidation, ctrl.insert);
router.route('/update').put(userCtrl.jwtTokenValidation, ctrl.update);
router.route('/all').get(ctrl.getAll);
router.route('/getAll/:page').get(ctrl.getByFilterPaginationCustom);
router.route('/filter').get(ctrl.getByFilter);
router.route('/get-one/:id').get(ctrl.getOne);
router.route('/multiple').put(ctrl.updateAll);
exports.default = router;
//# sourceMappingURL=timeSheet.js.map