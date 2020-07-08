import { ResponseContent } from '../base/responseContent'
import BaseCtrl from './base'
import Meeting from '../models/meeting';

export default class MeetingCtrl extends BaseCtrl {
  model = Meeting
  response: ResponseContent;

  options = {
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
  getOne = (req, res) => {
    this.model.findOne({ _id: req.params.id, deleted: false }).populate([
      {
        path: 'meet', model: 'Meet', populate: [
          { path: 'user', model: 'User' },
          { path: 'category', model: 'Category' },
        ]
      },
      { path: 'user', model: 'User' },
    ]).exec((err, item) => {
      if (err) { return res.send(err); }
      res.status(200).json({isSuccessful:true,data:item});
    });
  }
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
      res.status(200).json({ isSuccessful: true, data: item });
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
        if (err) { return res.send(err); }
        res.status(200).json({ isSuccessful: true, count: docs });
      });
    } else {
      this.options.page = parseInt(req.params.page);
      this.model.paginate(query, this.options, (err, docs) => {
        if (err) { return res.send(err); }
        res.status(200).json({ ...docs, isSuccessful: true });
      });
    }
  };

}
