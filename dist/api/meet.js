"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var user_1 = require("../controllers/user");
var meet_1 = require("../controllers/meet");
var router = express.Router();
var userCtrl = new user_1.default();
var ctrl = new meet_1.default();
router.route('/save').post(userCtrl.jwtTokenValidation, ctrl.save);
router.route('/update').put(userCtrl.jwtTokenValidation, ctrl.update);
router.route('/set-rate/:id').put(userCtrl.jwtTokenValidation, ctrl.setRate);
router.route('/all').get(ctrl.getAll);
router.route('/getAll/:page').get(ctrl.getByFilterPaginationCustom);
router.route('/filter').get(ctrl.getByFilter);
router.route('/get-one/:id').get(ctrl.getOne);
router.route('/multiple').put(ctrl.updateAll);
router.route('/search').post(ctrl.searchByPaginationCustom);
exports.default = router;
//# sourceMappingURL=meet.js.map