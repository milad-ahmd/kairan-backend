"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var country_1 = require("../controllers/country");
var user_1 = require("../controllers/user");
var router = express.Router();
var userCtrl = new user_1.default();
var countryCtrl = new country_1.default();
router.route('/save').post(userCtrl.jwtTokenValidation, countryCtrl.insert);
router.route('/update').put(userCtrl.jwtTokenValidation, countryCtrl.update);
router.route('/all').get(countryCtrl.getAll);
router.route('/filter-and-pagination/:page').get(countryCtrl.getByFilterPagination);
router.route('/filter').get(countryCtrl.getByFilter);
router.route('/get-one/:id').get(countryCtrl.get);
router.route('/multiple').put(countryCtrl.updateAll);
exports.default = router;
//# sourceMappingURL=country.js.map