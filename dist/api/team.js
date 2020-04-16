"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var team_1 = require("../controllers/team");
var user_1 = require("../controllers/user");
var router = express.Router();
var userCtrl = new user_1.default();
var ctrl = new team_1.default();
router.route('/save').post(userCtrl.jwtTokenValidation, ctrl.insert);
router.route('/update').put(userCtrl.jwtTokenValidation, ctrl.update);
router.route('/all').get(ctrl.getAll);
router.route('/getAll/:page').get(ctrl.getByFilterPaginationCustom);
router.route('/filter').get(ctrl.getByFilter);
router.route('/get-one/:id').get(ctrl.get);
router.route('/multiple').put(ctrl.updateAll);
exports.default = router;
//# sourceMappingURL=team.js.map