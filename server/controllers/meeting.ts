import {ResponseContent} from '../base/responseContent'
import BaseCtrl from './base'
import Meeting from '../models/meeting';
import TimeSheet from '../models/timeSheet';
import * as moment from 'moment';

export default class MeetingCtrl extends BaseCtrl {
    model = Meeting
    timeSheetModel = TimeSheet
    response: ResponseContent;

    options = {
        page: 1,
        limit: 10,
        sort: {order: 1},
        populate: [
            {
                path: 'meet', model: 'Meet', populate: [
                    {path: 'user', model: 'User'},
                    {path: 'category', model: 'Category'},
                ]
            },
            {path: 'user', model: 'User'},
            {path: 'timeSheet', model: 'TimeSheet'},
        ]
    };
    getOne = (req, res) => {
        this.model.findOne({_id: req.params.id, deleted: false}).populate([
            {
                path: 'meet', model: 'Meet', populate: [
                    {path: 'user', model: 'User'},
                    {path: 'category', model: 'Category'},
                ]
            },
            {path: 'user', model: 'User'},
            {path: 'timeSheet', model: 'TimeSheet'},
        ]).exec((err, item) => {
            if (err) {
                return res.send(err);
            }
            res.status(200).json({isSuccessful: true, data: item});
        });
    }
    getAccessTimeSheet = (req, res) => {
        let populate = [
            {path: 'timeSheet', model: 'TimeSheet'},
        ]
        let date = moment(new Date()).format('YYYYMMDD')
        let dayNumber = moment(req.params.date, 'YYYYMMDD').day()
        let days = ['sun', 'mon', 'tue', 'wed', 'thu', 'fri', 'sat']
        let dayTitle = days[dayNumber];

        if (parseInt(req.params.date) > parseInt(date)) {
            this.model.find({
                meet: req.params.id,
                date: req.params.date,
                deleted: false
            }).populate(populate).exec((err, meetings) => {
                if (err) {
                    return res.send(err);
                }
                if (!meetings || meetings.length == 0) {
                    this.timeSheetModel.find({
                        meet: req.params.id,
                        day: dayTitle,
                        deleted: false
                    }).exec((err, items) => {
                        if (err) {
                            return res.send(err);
                        }
                        this.timeSheetModel.find({meet: req.params.id, deleted: false})
                        res.status(200).json({isSuccessful: true, data: items});
                    });
                } else {
                    let acceptedTimeSheets = []
                    for (let item of meetings) {
                        if (item.status === 'accept') {
                            acceptedTimeSheets.push(item.timeSheet._id)
                        }
                    }
                    this.timeSheetModel.find({
                        meet: req.params.id,
                        day: dayTitle,
                        _id: {$ne: acceptedTimeSheets},
                        deleted: false
                    }).exec((err, items) => {
                        if (err) {
                            return res.send(err);
                        }
                        this.timeSheetModel.find({meet: req.params.id, deleted: false})
                        res.status(200).json({isSuccessful: true, data: items});
                    });
                }

            });
        } else {
            res.status(200).json({isSuccessful: true, data: [], message: 'date is past'});
        }
    }
    getAccessDayTimeSheet = (req, res) => {

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
    }
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

}
