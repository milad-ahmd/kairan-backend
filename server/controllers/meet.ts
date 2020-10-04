import {ResponseContent} from '../base/responseContent'
import BaseCtrl from './base'
import Meet from '../models/meet';

export default class MeetCtrl extends BaseCtrl {
    model = Meet
    response: ResponseContent;

    options = {
        page: 1,
        limit: 10,
        sort: {order: 1},
        populate: [
            {path: 'user', model: 'User'},
            {path: 'category', model: 'Category'},
        ]
    };
    save = (req, res) => {
        req.body.user = req.payload.user._id
        const obj = new this.model(req.body);
        obj.save((err, item) => {
            // 11000 is the code for duplicate key error
            if (err && err.code === 11000) {
                res.sendStatus(400);
            }
            if (err) {
                return res.send(err);
            }
            res.status(200).json({isSuccessful: true, data: item});
        });
    };
    getOne = (req, res) => {
        this.model.findOne({_id: req.params.id, deleted: false}).populate([
            {path: 'user', model: 'User'},
            {path: 'category', model: 'Category'},
        ]).exec((err, item) => {
            if (err) {
                return res.send(err);
            }
            res.status(200).json({isSuccessful: true, data: item});
        });
    };
    setRate = (req, res) => {
        let userId = req.payload.user._id;
        this.model.findOne({_id: req.params.id, deleted: false}).exec((err, item) => {
            if (err) {
                return res.send(err);
            }
            if (item.userRated.indexOf(userId) > -1 || userId === item.user) {
                res.status(200).json({isSuccessful: true, message: 'you can not rate to this meet'});
            } else {
                let rate = req.body.rate;
                if (rate >= 0 && rate <= 5) {
                    let updater = {
                        rateAverage: item.rateAverage,
                        rateCount: item.rateCount,
                        rateSum: item.rateSum,
                        userRated: item.userRated
                    };
                    updater['rateSum'] += rate;
                    updater['rateCount'] += 1;
                    updater['userRated'].push(userId);
                    updater['rateAverage'] += updater['rateSum'] / updater['rateCount'];

                    this.model.findOneAndUpdate({_id: req.params.id}, {$set: updater}, {new: false}, (err, doc) => {
                        if (err) {
                            return res.send(err);
                        }
                        res.status(200).json({isSuccessful: true, data: doc});
                    });
                } else {
                    res.status(200).json({isSuccessful: true, message: 'rate must be between of 0 to 5'});
                }
            }

        });
    };
    getByFilterPaginationCustom = (req, res) => {
        let query = req.query;
        if (!query['deleted']) {
            query['deleted'] = false;
        } else if (query['deleted'] == 'none') {
            delete query['deleted']
        }
        if (query['count'] && query['count'] === "1") {
            delete query['count'];
            this.model.countDocuments(query, (err, docs) => {
                if (err) {
                    return res.send(err);
                }
                res.status(200).json({isSuccessful: true, count: docs});
            });
        } else {
            this.options.page = parseInt(req.params.page);
            this.model.paginate(query, this.options, (err, docs) => {
                if (err) {
                    return res.send(err);
                }
                res.status(200).json({data: docs, isSuccessful: true});
            });
        }
    };
    searchByPaginationCustom = (req, res) => {
        var meet_finder = {$or: [], deleted: false,is_active:true};
        if (req.body.text) {
            meet_finder.$or.push({"description": new RegExp(req.body.text)});
            meet_finder.$or.push({"location.details": new RegExp(req.body.text)});
            this.options.page = parseInt(req.params.page);
            this.model.paginate(meet_finder, this.options, (err, docs) => {
                if (err) {
                    return res.send(err);
                }
                res.status(200).json({data: docs, isSuccessful: true});
            });

        }
    }


}
