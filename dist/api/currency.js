"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var currency_1 = require("../controllers/currency");
var user_1 = require("../controllers/user");
var router = express.Router();
var userCtrl = new user_1.default();
var currencyCtrl = new currency_1.default();
router.route('/save').post(userCtrl.jwtTokenValidation, currencyCtrl.insert);
router.route('/update').put(userCtrl.jwtTokenValidation, currencyCtrl.update);
router.route('/all').get(currencyCtrl.getAll);
router.route('/filter-and-pagination/:page').get(currencyCtrl.getByFilterPagination);
router.route('/filter').get(currencyCtrl.getByFilter);
router.route('/get-one/:id').get(currencyCtrl.get);
router.route('/multiple').put(currencyCtrl.updateAll);
exports.default = router;
//# sourceMappingURL=currency.js.map