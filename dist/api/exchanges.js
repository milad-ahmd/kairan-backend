"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var user_1 = require("../controllers/user");
var exchanges_1 = require("../controllers/exchanges");
var router = express.Router();
var userCtrl = new user_1.default();
var exchangesCtrl = new exchanges_1.default();
router.route('/save').post(userCtrl.jwtTokenValidation, exchangesCtrl.save);
router.route('/update').put(userCtrl.jwtTokenValidation, exchangesCtrl.update);
router.route('/all').get(exchangesCtrl.getAll);
router.route('/filter').get(exchangesCtrl.getByFilter);
router.route('/get-one/:id').get(exchangesCtrl.get);
router.route('/multiple').put(exchangesCtrl.updateAll);
router.route('/exchange-list/:page/:user_id').get(exchangesCtrl.exchangesList);
exports.default = router;
//# sourceMappingURL=exchanges.js.map