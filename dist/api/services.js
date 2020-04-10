"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var services_1 = require("../controllers/services");
var user_1 = require("../controllers/user");
var router = express.Router();
var userCtrl = new user_1.default();
var ctrl = new services_1.default();
router.route('/save').post(userCtrl.jwtTokenValidation, ctrl.insert);
router.route('/update').put(userCtrl.jwtTokenValidation, ctrl.update);
router.route('/all').get(ctrl.getAll);
router.route('/getAll/:page').get(ctrl.getByFilterPagination);
router.route('/filter').get(ctrl.getByFilter);
router.route('/get-one/:id').get(ctrl.get);
router.route('/multiple').put(ctrl.updateAll);
exports.default = router;
//# sourceMappingURL=services.js.map