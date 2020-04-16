"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var product_1 = require("../models/product");
var base_1 = require("./base");
var ProductCtrl = /** @class */ (function (_super) {
    __extends(ProductCtrl, _super);
    function ProductCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = product_1.default;
        _this.options = {
            page: 1,
            limit: 10,
            sort: { order: 1 },
            populate: [
                { path: 'manager', model: 'Manager' },
                { path: 'customer', model: 'Client' },
            ]
        };
        _this.getByFilterPaginationProduct = function (req, res) {
            var query = req.query;
            if (!query['deleted']) {
                query['deleted'] = false;
            }
            else if (query['deleted'] == 'none') {
                delete query['deleted'];
            }
            if (query['count'] && query['count'] === "1") {
                delete query['count'];
                _this.model.countDocuments(query, function (err, docs) {
                    if (err) {
                        return res.send(err);
                    }
                    res.status(200).json({ isSuccessful: true, count: docs });
                });
            }
            else {
                _this.options.page = parseInt(req.params.page);
                _this.model.paginate(query, _this.options, function (err, docs) {
                    if (err) {
                        return res.send(err);
                    }
                    res.status(200).json(__assign({}, docs, { isSuccessful: true }));
                });
            }
        };
        _this.getAllByPopulate = function (req, res) {
            var populate = [
            // { path: 'manager', model: 'Manager' },
            // { path: 'customer', model: 'Client' },
            ];
            _this.model.find({ deleted: false }).populate(populate).exec(function (err, docs) {
                if (err) {
                    return res.send(err);
                }
                res.status(200).json({ isSuccessful: true, data: docs });
            });
        };
        _this.getByPopulate = function (req, res) {
            var populate = [
            // { path: 'manager', model: 'Manager' },
            // { path: 'customer', model: 'Client' },
            ];
            _this.model.findOne({ _id: req.params.id, deleted: false }).populate(populate).exec(function (err, item) {
                if (err) {
                    return res.send(err);
                }
                res.status(200).json({ isSuccessful: true, data: item });
            });
        };
        return _this;
    }
    return ProductCtrl;
}(base_1.default));
exports.default = ProductCtrl;
//# sourceMappingURL=product.js.map