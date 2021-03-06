"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var user_1 = require("../controllers/user");
var category_1 = require("../controllers/category");
var router = express.Router();
var userCtrl = new user_1.default();
var ctrl = new category_1.default();
router.route('/save').post(userCtrl.jwtTokenValidation, ctrl.insert);
router.route('/update').put(userCtrl.jwtTokenValidation, ctrl.update);
router.route('/all').get(ctrl.getAll);
router.route('/getAll/:page').get(ctrl.getByFilterPaginationCustom);
router.route('/filter').get(ctrl.getByFilter);
router.route('/get-one/:id').get(ctrl.get);
router.route('/multiple').put(ctrl.updateAll);
exports.default = router;
//# sourceMappingURL=category.js.map