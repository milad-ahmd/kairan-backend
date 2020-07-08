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
var base_1 = require("./base");
var meeting_1 = require("../models/meeting");
var MeetingCtrl = /** @class */ (function (_super) {
    __extends(MeetingCtrl, _super);
    function MeetingCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = meeting_1.default;
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
            ]).exec(function (err, item) {
                if (err) {
                    return res.send(err);
                }
                res.status(200).json({ isSuccessful: true, data: item });
            });
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
                    res.status(200).json(__assign({}, docs, { isSuccessful: true }));
                });
            }
        };
        return _this;
    }
    return MeetingCtrl;
}(base_1.default));
exports.default = MeetingCtrl;
//# sourceMappingURL=meeting.js.map