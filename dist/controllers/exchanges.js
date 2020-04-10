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
var exchanges_1 = require("../models/exchanges");
var userInfo_1 = require("../models/userInfo");
var base_1 = require("./base");
var ExchangesCtrl = /** @class */ (function (_super) {
    __extends(ExchangesCtrl, _super);
    function ExchangesCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = exchanges_1.default;
        _this.modelInfo = userInfo_1.default;
        _this.exchangesList = function (req, res) {
            var query = __assign({}, req.query, { user_id: req.params.user_id });
            if (!query['deleted']) {
                query['deleted'] = false;
            }
            else if (query['deleted'] == 'none') {
                delete query['deleted'];
            }
            _this.options.page = parseInt(req.params.page);
            var populator = [
                { path: 'user_id', model: 'User' },
                { path: 'user_info_id', model: 'UserInfo' },
            ];
            _this.model.find(query).populate(populator).skip((parseInt(req.params.page) - 1) * 10)
                .limit(10).exec(function (err, docs) {
                _this.model.countDocuments(query, function (err, count) {
                    if (err) {
                        return res.send(err);
                    }
                    return res.status(200).json({ data: docs, count: count, isSuccessful: true });
                });
            });
        };
        _this.save = function (req, res) {
            var body = req.body;
            if (req.payload.user.role === 'exchange') {
                _this.model.find({ user_id: req.payload.user._id, from: body.from, to: body.to }).exec(function (err, docs) {
                    if (docs && docs.length > 0) {
                        _this.model.findOneAndUpdate({ _id: docs[0]._id }, { $set: { value: body.value } }, { new: true }, function (err, doc) {
                            if (err) {
                                return res.send(err);
                            }
                            res.status(200).json({ isSuccessful: true, data: doc });
                        });
                    }
                    else {
                        body['user_id'] = req.payload.user._id;
                        _this.modelInfo.find({ user_id: body['user_id'] }).exec(function (error, infos) {
                            body['user_info_id'] = infos[0]._id;
                            body['exchange_name'] = infos[0].exchange_name;
                            var obj = new _this.model(body);
                            obj.save(function (err, item) {
                                if (err && err.code === 11000) {
                                    res.sendStatus(400);
                                }
                                if (err) {
                                    return res.send(err);
                                }
                                res.status(200).json({ isSuccessful: true, data: item });
                            });
                        });
                    }
                });
            }
            else {
                return res.status(401).json({ isSuccessful: false, message: 'No authorization detected' });
            }
        };
        return _this;
    }
    return ExchangesCtrl;
}(base_1.default));
exports.default = ExchangesCtrl;
//# sourceMappingURL=exchanges.js.map