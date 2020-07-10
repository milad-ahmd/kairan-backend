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
Object.defineProperty(exports, "__esModule", { value: true });
var base_1 = require("./base");
var timeSheet_1 = require("../models/timeSheet");
var TimeSheetCtrl = /** @class */ (function (_super) {
    __extends(TimeSheetCtrl, _super);
    function TimeSheetCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = timeSheet_1.default;
        _this.options = {
            page: 1,
            limit: 10,
            sort: { order: 1 },
            populate: [
                {
                    path: 'meet', model: 'Meet', populate: [
                        { path: 'user', model: 'User' },
                        { path: 'category', model: 'Category' },
                    ]
                }
            ]
        };
        _this.getOne = function (req, res) {
            _this.model.findOne({ _id: req.params.id, deleted: false }).populate([
                {
                    path: 'meet', model: 'Meet', populate: [
                        { path: 'user', model: 'User' },
                        { path: 'category', model: 'Category' },
                    ]
                }
            ]).exec(function (err, item) {
                if (err) {
                    return res.send(err);
                }
                res.status(200).json({ isSuccessful: true, data: item });
            });
        };
        _this.getByFilterPaginationCustom = function (req, res) {
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
                    res.status(200).json({ data: docs, isSuccessful: true });
                });
            }
        };
        return _this;
    }
    return TimeSheetCtrl;
}(base_1.default));
exports.default = TimeSheetCtrl;
//# sourceMappingURL=timeSheet.js.map