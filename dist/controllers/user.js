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
var user_1 = require("../models/user");
var manager_1 = require("../models/manager");
var base_1 = require("./base");
var authcontroller_1 = require("./authcontroller");
var bcrypt = require("bcryptjs");
var excelToJson = require('convert-excel-to-json');
var UserCtrl = /** @class */ (function (_super) {
    __extends(UserCtrl, _super);
    function UserCtrl() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.model = user_1.default;
        _this.options = {
            page: 1,
            limit: 10
        };
        _this.register = function (req, res) {
            _this.model.findOne({ email: req.body.email }, function (err, user) {
                var resp = { isSuccessful: true, message: 'Successfully Created a user', result: '', id: '', code: '' };
                // check if user exist with defined email
                if (user) {
                    resp.result = user._id;
                    resp.isSuccessful = false;
                    resp.message = 'User already Exist';
                    return res.json(resp);
                }
                var activationCode = _this.rand(999, 10000);
                var obj = new _this.model(req.body);
                obj.activationCode = activationCode;
                //            smsCtrl.sendSmsRegisteration(obj.phone, obj.activationCode, user.username).then((smsRes) => {
                //                if (smsRes) {
                obj.save(function (err, user) {
                    if (err && err.code === 11000) {
                        return res.status(400).json({ isSuccessful: false, message: 'Duplicate key error' });
                    }
                    if (err) {
                        return res.json({ isSuccessful: false, message: err });
                    }
                    resp.result = user._id;
                    resp.code = activationCode;
                    resp.message = 'User Successfully Created';
                    resp.isSuccessful = true;
                    return res.json(resp);
                });
                //                } else {
                //                    return res.status(400).json({ isSuccessful: false, message: 'cannot send sms' });
                //
                //                }
                //            })
            });
        };
        _this.addExchange = function (req, res) {
            //    const result = excelToJson({
            //      sourceFile: 'server/controllers/exchanges.xlsx'
            //    }).Sheet1
            //
            //    result.splice(0, 1)
            //    let i = 0
            //    for (let item of result) {
            //      item['H'] = item['H']?item['H'].replace(/\s/g, ''):''
            //      let user = {
            //        username: `exchange${i}@gmail.com`,
            //        email: `exchange${i}@gmail.com`,
            //        password: '123456',
            //        mainCountry: item['D'].toLowerCase(),
            //        role: 'exchange',
            //        is_active: true,
            //        is_verify: true,
            //      }
            //
            //      const obj = new this.model(user)
            //      i++
            //      obj.save((err, user) => {
            //        if (user && user._id) {
            //          let userInfo = {
            //            country: item['D'].toLowerCase(),
            //            user_id: user._id,
            //            city: item['E'].toLowerCase(),
            //            exchange_name: item['B'],
            //            description: item['C'],
            //            currencies: item['I'] ? item['I'].split(',') : [],
            //            location: {
            //              lat: 0,
            //              lng: 0
            //            }
            //          }
            //          const obj1 = new this.modelInfo(userInfo)
            //          obj1.save((err, user) => {
            //          })
            //        }
            //
            //      })
            //    }
            var currencies = [];
            currencies = 'BND , BGN , CAD , CLP , COP , CRC , HRK , CZK , DKK , DOP , XCD , FJD , HKD , HUF , ISK , IDR , ILS , JMD , JPY , JOD , KES , MYR , MUR , MXN , NZD , NOK , OMR , PEN , PHP , PLN , RON , RUB , SAR , SGD , ZAR , KRW , SEK , CHF , TWD , THB , TRY , AED , VND'.split(' , ');
            for (var _i = 0, currencies_1 = currencies; _i < currencies_1.length; _i++) {
                var item = currencies_1[_i];
                var currency = {
                    name: item,
                    unit: item,
                };
                var obj1 = new manager_1.default(currency);
                obj1.save(function (err, user) {
                });
            }
        };
        _this.login = function (req, res) {
            _this.model.findOne({ email: req.body.username, is_active: true }, function (err, user) {
                if (!user) {
                    return res.sendStatus(403);
                }
                user.comparePassword(req.body.password, function (error, isMatch) {
                    if (!isMatch) {
                        return res.sendStatus(403);
                    }
                    // const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
                    var token = authcontroller_1.default.create({ user: user });
                    var refresh_token = authcontroller_1.default.createRefreshToken({ user: user });
                    res.status(200).json({
                        access_token: token,
                        refresh_token: refresh_token,
                        user_id: user._id,
                        role: user.role
                    });
                });
            });
        };
        _this.loginAdmin = function (req, res) {
            _this.model.findOne({ email: req.body.username }, function (err, user) {
                if (!user) {
                    return res.sendStatus(403);
                }
                user.comparePassword(req.body.password, function (error, isMatch) {
                    if (!isMatch) {
                        return res.sendStatus(403);
                    }
                    var token = authcontroller_1.default.createAdminToken({ user: user });
                    res.status(200).json({ access_token: token, user_id: user._id, role: user.role });
                });
            });
        };
        _this.verify = function (req, res) {
            var userBody = req.body;
            _this.model.findOne({ username: userBody.username }, function (err, user) {
                if (err) {
                    return res.send(err);
                }
                if (user) {
                    if (user.activationCode === userBody.activationCode) {
                        _this.model.findOneAndUpdate({ phone: userBody.phone }, {
                            '$set': {
                                is_active: true,
                                is_verify: true
                            }
                        }, function (err, result) {
                            if (err) {
                                //
                                return res.send(err);
                            }
                            //                        this.xp = new XpLog(user._id, xpConfig.verify_phone, 'verify_phone')
                            //                        xpCtrl.saveXpLog(this.xp).then(xpRes => {
                            //                            if (xpRes) {
                            return res.status(200).json({ isSuccessful: true });
                            //                            }
                            //                        }).catch(err => {
                            //
                            //                        })
                        });
                    }
                    else {
                        return res.status(200).json({ isSuccessful: false, message: 'activation code is not valid' });
                    }
                }
                else {
                    return res.status(200).json({ isSuccessful: false, message: 'user not found' });
                }
            });
        };
        _this.forgetPassword = function (req, res) {
            var userBody = req.body;
            _this.model.findOne({ phone: userBody.phone }, function (err, user) {
                if (err) {
                    return res.send(err);
                }
                if (user) {
                    var activationCode = _this.rand(999, 10000);
                    //                smsCtrl.sendSmsRegisteration(userBody.phone, activationCode, user.username).then((smsRes) => {
                    //                    if (smsRes) {
                    //                        this.model.findOneAndUpdate({ phone: userBody.phone }, { "$set": { activationCode: activationCode } }, (err, result) => {
                    //                            if (err) {
                    //                                return res.send(err)
                    //                            }
                    //                            return res.status(200).json({ isSuccessful: true, activationCode: activationCode })
                    //                        })
                    //                    } else {
                    //                        return res.status(400).json({ isSuccessful: false, message: 'cannot send sms' });
                    //
                    //                    }
                    //                })
                }
                else {
                    return res.status(200).json({ isSuccessful: false, message: 'user not found' });
                }
            });
        };
        _this.resetPassword = function (req, res) {
            var userBody = req.body;
            var self = _this;
            bcrypt.genSalt(10, function (err, salt) {
                if (err) {
                    return res.send(err);
                }
                bcrypt.hash(userBody.password, salt, function (error, hash) {
                    if (error) {
                        return res.send(err);
                    }
                    userBody.password = hash;
                });
                self.model.findOneAndUpdate({ phone: userBody.phone }, { '$set': { password: userBody.password } }, function (err, result) {
                    if (err) {
                        return res.send(err);
                    }
                    return res.status(200).json({ isSuccessful: true });
                });
            });
        };
        _this.resendCode = function (req, res) {
            var userBody = req.body;
            _this.model.findOne({ phone: userBody.phone }, function (err, user) {
                if (err) {
                    return res.send(err);
                }
                if (user) {
                    var activationCode = _this.rand(999, 10000);
                    //                smsCtrl.sendSmsRegisteration(userBody.phone, activationCode, user.username).then((smsRes) => {
                    //                    if (smsRes) {
                    //                        this.model.findOneAndUpdate({ phone: userBody.phone }, { "$set": { activationCode: activationCode } }, (err, result) => {
                    //                            if (err) {
                    //                                return res.send(err)
                    //                            }
                    //                            return res.status(200).json({ isSuccessful: true, activationCode: activationCode })
                    //                        })
                    //                    } else {
                    //                        return res.status(400).json({ isSuccessful: false, message: 'cannot send sms' });
                    //
                    //                    }
                    //                })
                }
                else {
                    return res.status(200).json({ isSuccessful: false, message: 'user not found' });
                }
            });
        };
        _this.refreshToken = function (req, res) {
            _this.model.findOne({ email: req.payload.user.email }, function (err, user) {
                if (!user) {
                    return res.sendStatus(403);
                }
                var token = authcontroller_1.default.create({ user: user });
                res.status(200).json({ isSuccessful: true, token: token, user_id: user._id });
            });
        };
        _this.jwtTokenValidation = function (req, res, next) {
            try {
                var authToken = req.get('Authorization');
                if (!authToken)
                    return res.status(401).json({ isSuccessful: false, message: 'No authorization detected' });
                var token = authToken.replace('Bearer ', '');
                var verifiedToken = authcontroller_1.default.verify(token);
                if (verifiedToken.name == 'JwtParseError')
                    return res.status(401).json({
                        isSuccessful: false,
                        message: verifiedToken.message
                    });
                // if (roll.indexOf(verifiedToken.user.role) === -1) return res.status(401).json({
                //     isSuccessful: false,
                //     message: 'No authorization detected'
                // })
                res.locals.accessToken = verifiedToken.token || null;
                res.locals.encryptToken = verifiedToken.encrypt_token || null;
                req.payload = verifiedToken;
                return next();
            }
            catch (error) {
                return res.status(500).json(error);
            }
        };
        _this.searchUserByEmail = function (req, res) {
            var text = req.query.text;
            var user_finder = {};
            if (text) {
                user_finder['$or'] = [];
                user_finder.$or.push({ 'email': new RegExp(text) });
                user_finder.$or.push({ 'username': new RegExp(text) });
            }
            _this.model.find(user_finder).exec(function (err, users) {
                if (err) {
                    return res.send(err);
                }
                return res.status(200).json({ isSuccessful: true, data: users });
            });
        };
        _this.getUserInfo = function (req, res) {
            var userId = req.payload.user._id;
            _this.model.findById(userId).select('username firstName lastName email phone level role').exec(function (err, user) {
                if (err) {
                    return res.send(err);
                }
                if (user) {
                    res.status(200).json({ isSuccessful: true, data: user });
                }
                else {
                    return res.status(200).json({ isSuccessful: false, message: 'user not found', statusCode: 404 });
                }
            });
        };
        _this.getFriends = function (req, res) {
            var userId = req.payload.user._id;
            _this.model.findById(userId).select('friends').exec(function (err, user) {
                if (err) {
                    return res.send(err);
                }
                if (user) {
                    _this.model.find({ '_id': { '$in': user.friends }, deleted: false }, function (err, docs) {
                        if (err) {
                            return res.send(err);
                        }
                        res.status(200).json({ isSuccessful: true, data: docs });
                    });
                }
                else {
                    return res.status(200).json({ isSuccessful: false, message: 'user not found', statusCode: 404 });
                }
            });
        };
        return _this;
        // exchangeList = (req, res) => {
        //   let query = req.query
        //   if (!query['deleted']) {
        //     query['deleted'] = false
        //   } else if (query['deleted'] == 'none') {
        //     delete query['deleted']
        //   }
        //   this.options.page = parseInt(req.params.page)
        //   var user_populator = [
        //     { path: 'user_id', model: 'User' },
        //   ]
        //   this.modelInfo.find(query).populate(user_populator).skip((parseInt(req.params.page) - 1) * 10)
        //     .limit(10).exec((err, docs) => {
        //     this.modelInfo.countDocuments(query, (err, count) => {
        //       if (err) {
        //         return res.send(err)
        //       }
        //       return res.status(200).json({ data: docs, count, isSuccessful: true })
        //     })
        //   })
        // }
        // getOneExchange = (req, res) => {
        //   var user_populator = [
        //     { path: 'user_id', model: 'User' },
        //
        //   ]
        //   this.modelInfo.findById(req.params.id).populate(user_populator).exec((err, docs) => {
        //     return res.status(200).json({ data: docs, isSuccessful: true })
        //   })
        // }
        // searchExchange = (req, res) => {
        //   let query = { deleted: false }
        //   let queryExchanges = { deleted: false }
        //   if (req.query.country) {
        //     query['country'] = req.query.country
        //   }
        //   if (req.query.city) {
        //     query['city'] = req.query.city
        //   }
        //   if (req.query.from) {
        //     queryExchanges['from'] = req.query.from
        //   }
        //   if (req.query.to) {
        //
        //     queryExchanges['to'] = req.query.to
        //   }
        //   if (req.query.exchange_name) {
        //     queryExchanges['exchange_name'] = req.query.exchange_name
        //   }
        //   var user_populator = [
        //     { path: 'user_id', model: 'User' },
        //     { path: 'user_info_id', model: 'UserInfo' },
        //   ]
        //   this.modelInfo.find(query).exec((err, docs) => {
        //     let ids = []
        //     docs.forEach(item => {
        //       ids.push(item._id)
        //     })
        //     this.modelExchanges.find({
        //       ...queryExchanges,
        //       user_info_id: { $in: ids }
        //     }).populate(user_populator).exec((err, data) => {
        //       return res.status(200).json({ data: data, users: docs, isSuccessful: true })
        //     })
        //   })
        // }
    }
    UserCtrl.prototype.rand = function (min, max) {
        var prev;
        var num = Math.floor(Math.random() * (max - min + 1) + min);
        return prev = num === prev && min !== max ? this.rand(min, max) : num;
    };
    return UserCtrl;
}(base_1.default));
exports.default = UserCtrl;
//# sourceMappingURL=user.js.map