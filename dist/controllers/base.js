"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BaseCtrl = /** @class */ (function () {
    function BaseCtrl() {
        var _this = this;
        // Get all
        this.getAll = function (req, res) {
            _this.model.find({ deleted: false }, function (err, docs) {
                if (err) {
                    return res.send(err);
                }
                res.status(200).json({ isSuccessful: true, data: docs });
            });
        };
        this.options = {
            page: 1,
            limit: 10
        };
        // Count all
        this.count = function (req, res) {
            _this.model.count(function (err, count) {
                if (err) {
                    return res.send(err);
                }
                res.status(200).json({ isSuccessful: true, count: count });
            });
        };
        // Insert
        this.insert = function (req, res) {
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
        // Get by id
        this.get = function (req, res) {
            _this.model.findOne({ _id: req.params.id, deleted: false }, function (err, item) {
                if (err) {
                    return res.send(err);
                }
                res.status(200).json({ isSuccessful: true, data: item });
            });
        };
        this.getMultiple = function (req, res) {
            _this.model.find({ "_id": { "$in": req.body.components }, deleted: false }, function (err, docs) {
                if (err) {
                    return res.send(err);
                }
                res.status(200).json({ data: docs, isSuccessful: true });
            });
        };
        // Update by id
        this.update = function (req, res) {
            _this.model.findOneAndUpdate({ _id: req.body._id }, req.body, { new: true }, function (err, doc) {
                if (err) {
                    return res.send(err);
                }
                res.status(200).json({ isSuccessful: true, data: doc });
            });
        };
        this.getMulti = function (req, res) {
            _this.model.find({
                '_id': { $in: req.body.ids }, deleted: false
            }, function (err, docs) {
                if (err) {
                    return res.send(err);
                }
                res.status(200).json(docs);
            });
        };
        // Update all by list id
        this.updateAll = function (req, res) {
            var finalRes = {};
            var count = 0;
            var ids = req.body.id;
            var updatedDoc = [];
            var updateById = function (id, body) {
                return new Promise(function (resolve, reject) {
                    _this.model.findOneAndUpdate({ _id: id }, body, function (err) {
                        if (err) {
                            return res.send(err);
                        }
                        resolve(id);
                    });
                });
            };
            var parseData = function () {
                if (ids.length > 0) {
                    var id = ids[count];
                    updateById(id, req.body.objects).then(function (data) {
                        if (count < ids.length - 1) {
                            count++;
                            if (data)
                                updatedDoc.push(data);
                            parseData();
                        }
                        else {
                            if (data)
                                updatedDoc.push(data);
                            finalRes['result'] = {
                                list: updatedDoc
                            };
                            res.status(200).send(finalRes);
                        }
                    });
                }
                else {
                    finalRes['message'] = 'Array is zero';
                    res.status(200).send(finalRes);
                }
            };
            parseData();
        };
        // Delete by id
        this.delete = function (req, res) {
            _this.model.findOneAndRemove({ _id: req.params.id }, function (err) {
                if (err) {
                    return res.send(err);
                }
                res.sendStatus(200);
            });
        };
        this.getByFilter = function (req, res) {
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
                _this.model.find(query, function (err, docs) {
                    if (err) {
                        return res.send(err);
                    }
                    res.status(200).json({ isSuccessful: true, data: docs });
                });
            }
        };
        this.getByFilterPagination = function (req, res) {
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
        this.getByStrongFilter = function (req, res) {
            var fields = req.body;
            var query = {};
            for (var _i = 0, fields_1 = fields; _i < fields_1.length; _i++) {
                var item = fields_1[_i];
                if (item.type == 'string') {
                    query[item.name] = item.value;
                }
                else if (item.type == 'array') {
                    var regexp = new RegExp("\\b(?:" + item.value.join("|") + ")\\b", "i"); // "i" means case insensitive
                    query[item.name] = regexp;
                }
                else if (item.type == 'dateRange') {
                    var fromDate = item.value.split('-')[0];
                    var toDate = item.value.split('-')[1];
                    query[item.name] = { "$gte": new Date(fromDate.split(' ')[2], fromDate.split(' ')[1] - 1, fromDate.split(' ')[0]), "$lt": new Date(toDate.split(' ')[2], toDate.split(' ')[1] - 1, toDate.split(' ')[0]) };
                }
            }
            // query['deleted'] = false;
            _this.model.find(query, function (err, docs) {
                if (err) {
                    return res.send(err);
                }
                res.status(200).json({ data: docs, isSuccessful: true });
            });
        };
        this.getByStrongFilterPagination = function (req, res) {
            var fields = req.body;
            var query = {};
            if (fields) {
                for (var _i = 0, fields_2 = fields; _i < fields_2.length; _i++) {
                    var item = fields_2[_i];
                    if (item.type == 'string') {
                        query[item.name] = item.value;
                    }
                    else if (item.type == 'array') {
                        var regexp = new RegExp("\\b(?:" + item.value.join("|") + ")\\b", "i"); // "i" means case insensitive
                        query[item.name] = regexp;
                    }
                    else if (item.type == 'dateRange') {
                        var fromDate = item.value.split('-')[0];
                        var toDate = item.value.split('-')[1];
                        query[item.name] = { "$gte": new Date(fromDate.split(' ')[2], fromDate.split(' ')[1] - 1, fromDate.split(' ')[0]), "$lt": new Date(toDate.split(' ')[2], toDate.split(' ')[1] - 1, toDate.split(' ')[0]) };
                    }
                }
            }
            query['deleted'] = false;
            _this.options.page = parseInt(req.params.page);
            _this.options.limit = parseInt(req.params.limit);
            _this.model.paginate(query, _this.options, function (err, docs) {
                if (err) {
                    return res.send(err);
                }
                res.status(200).json({ data: docs, isSuccessful: true });
            });
        };
    }
    return BaseCtrl;
}());
exports.default = BaseCtrl;
//# sourceMappingURL=base.js.map