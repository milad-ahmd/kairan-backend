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
var meet_1 = require("../models/meet");
var MeetCtrl = /** @class */ (function (_super) {
    __extends(MeetCtrl, _super);
    function MeetCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = meet_1.default;
        _this.options = {
            page: 1,
            limit: 10,
            sort: { order: 1 },
            populate: [
                { path: 'user', model: 'User' },
                { path: 'category', model: 'Category' },
            ]
        };
        _this.save = function (req, res) {
            req.body.user = req.payload.user._id;
            var obj = new _this.model(req.body);
            obj.save(function (err, item) {
                // 11000 is the code for duplicate key error
                if (err && err.code === 11000) {
                    res.sendStatus(400);
                }
                if (err) {
                    return res.send(err);
                }
                res.status(200).json({ isSuccessful: true, data: item });
            });
        };
        _this.getOne = function (req, res) {
            _this.model.findOne({ _id: req.params.id, deleted: false }).populate([
                { path: 'user', model: 'User' },
                { path: 'category', model: 'Category' },
            ]).exec(function (err, item) {
                if (err) {
                    return res.send(err);
                }
                res.status(200).json({ isSuccessful: true, data: item });
            });
        };
        _this.setRate = function (req, res) {
            var userId = req.payload.user._id;
            _this.model.findOne({ _id: req.params.id, deleted: false }).exec(function (err, item) {
                if (err) {
                    return res.send(err);
                }
                if (item.userRated.indexOf(userId) > -1 || userId === item.user) {
                    res.status(200).json({ isSuccessful: true, message: 'you can not rate to this meet' });
                }
                else {
                    var rate = req.body.rate;
                    if (rate >= 0 && rate <= 5) {
                        var updater = {
                            rateAverage: item.rateAverage,
                            rateCount: item.rateCount,
                            rateSum: item.rateSum,
                            userRated: item.userRated
                        };
                        updater['rateSum'] += rate;
                        updater['rateCount'] += 1;
                        updater['userRated'].push(userId);
                        updater['rateAverage'] += updater['rateSum'] / updater['rateCount'];
                        _this.model.findOneAndUpdate({ _id: req.params.id }, { $set: updater }, { new: false }, function (err, doc) {
                            if (err) {
                                return res.send(err);
                            }
                            res.status(200).json({ isSuccessful: true, data: doc });
                        });
                    }
                    else {
                        res.status(200).json({ isSuccessful: true, message: 'rate must be between of 0 to 5' });
                    }
                }
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
        _this.searchByPaginationCustom = function (req, res) {
            var meet_finder = { $or: [], deleted: false, is_active: true };
            if (req.body.text) {
                meet_finder.$or.push({ "description": new RegExp(req.body.text) });
                meet_finder.$or.push({ "location.details": new RegExp(req.body.text) });
                _this.options.page = parseInt(req.params.page);
                _this.model.paginate(meet_finder, _this.options, function (err, docs) {
                    if (err) {
                        return res.send(err);
                    }
                    res.status(200).json({ data: docs, isSuccessful: true });
                });
            }
        };
        return _this;
    }
    return MeetCtrl;
}(base_1.default));
exports.default = MeetCtrl;
//# sourceMappingURL=meet.js.map