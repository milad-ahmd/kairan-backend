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
var meeting_1 = require("../models/meeting");
var timeSheet_1 = require("../models/timeSheet");
var moment = require("moment");
var MeetingCtrl = /** @class */ (function (_super) {
    __extends(MeetingCtrl, _super);
    function MeetingCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = meeting_1.default;
        _this.timeSheetModel = timeSheet_1.default;
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
                },
                { path: 'user', model: 'User' },
                { path: 'timeSheet', model: 'TimeSheet' },
            ]
        };
        _this.getOne = function (req, res) {
            _this.model.findOne({ _id: req.params.id, deleted: false }).populate([
                {
                    path: 'meet', model: 'Meet', populate: [
                        { path: 'user', model: 'User' },
                        { path: 'category', model: 'Category' },
                    ]
                },
                { path: 'user', model: 'User' },
                { path: 'timeSheet', model: 'TimeSheet' },
            ]).exec(function (err, item) {
                if (err) {
                    return res.send(err);
                }
                res.status(200).json({ isSuccessful: true, data: item });
            });
        };
        _this.getAccessTimeSheet = function (req, res) {
            var populate = [
                { path: 'timeSheet', model: 'TimeSheet' },
            ];
            var date = moment(new Date()).format('YYYYMMDD');
            var dayNumber = moment(req.params.date, 'YYYYMMDD').day();
            var days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat'];
            var dayTitle = days[dayNumber];
            if (parseInt(req.params.date) > parseInt(date)) {
                _this.model.find({
                    meet: req.params.id,
                    date: req.params.date,
                    deleted: false
                }).populate(populate).exec(function (err, meetings) {
                    if (err) {
                        return res.send(err);
                    }
                    if (!meetings || meetings.length == 0) {
                        _this.timeSheetModel.find({
                            meet: req.params.id,
                            day: dayTitle,
                            deleted: false
                        }).exec(function (err, items) {
                            if (err) {
                                return res.send(err);
                            }
                            _this.timeSheetModel.find({ meet: req.params.id, deleted: false });
                            res.status(200).json({ isSuccessful: true, data: items });
                        });
                    }
                    else {
                        var acceptedTimeSheets = [];
                        for (var _i = 0, meetings_1 = meetings; _i < meetings_1.length; _i++) {
                            var item = meetings_1[_i];
                            if (item.status === 'accept') {
                                acceptedTimeSheets.push(item.timeSheet._id);
                            }
                        }
                        _this.timeSheetModel.find({
                            meet: req.params.id,
                            day: dayTitle,
                            _id: { $ne: acceptedTimeSheets },
                            deleted: false
                        }).exec(function (err, items) {
                            if (err) {
                                return res.send(err);
                            }
                            _this.timeSheetModel.find({ meet: req.params.id, deleted: false });
                            res.status(200).json({ isSuccessful: true, data: items });
                        });
                    }
                });
            }
            else {
                res.status(200).json({ isSuccessful: true, data: [], message: 'date is past' });
            }
        };
        _this.getAccessDayTimeSheet = function (req, res) {
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
    return MeetingCtrl;
}(base_1.default));
exports.default = MeetingCtrl;
//# sourceMappingURL=meeting.js.map