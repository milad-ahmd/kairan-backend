"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var user_1 = require("../controllers/user");
var meeting_1 = require("../controllers/meeting");
var router = express.Router();
var userCtrl = new user_1.default();
var ctrl = new meeting_1.default();
router.route('/save').post(userCtrl.jwtTokenValidation, ctrl.save);
router.route('/update').put(userCtrl.jwtTokenValidation, ctrl.update);
router.route('/all').get(ctrl.getAll);
router.route('/getAll/:page').get(ctrl.getByFilterPaginationCustom);
router.route('/filter').get(ctrl.getByFilter);
router.route('/get-one/:id').get(ctrl.getOne);
router.route('/get-access-time-sheet/:id/:date').get(ctrl.getAccessTimeSheet);
router.route('/multiple').put(ctrl.updateAll);
exports.default = router;
//# sourceMappingURL=meeting.js.map