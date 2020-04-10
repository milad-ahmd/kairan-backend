"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var city_1 = require("../controllers/city");
var user_1 = require("../controllers/user");
var router = express.Router();
var userCtrl = new user_1.default();
var cityCtrl = new city_1.default();
router.route('/save').post(userCtrl.jwtTokenValidation, cityCtrl.insert);
router.route('/update').put(userCtrl.jwtTokenValidation, cityCtrl.update);
router.route('/all').get(cityCtrl.getAll);
router.route('/filter-and-pagination/:page').get(cityCtrl.getByFilterPagination);
router.route('/filter').get(cityCtrl.getByFilter);
router.route('/get-one/:id').get(cityCtrl.get);
router.route('/multiple').put(cityCtrl.updateAll);
exports.default = router;
//# sourceMappingURL=city.js.map