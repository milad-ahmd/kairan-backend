import { ResponseContent } from '../base/responseContent'
import BaseCtrl from './base'
import TimeSheet from '../models/timeSheet';

export default class TimeSheetCtrl extends BaseCtrl {
  model = TimeSheet
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
      }
    ]
  };
  getOne = (req, res) => {
    this.model.findOne({ _id: req.params.id, deleted: false }).populate([
      {
        path: 'meet', model: 'Meet', populate: [
          { path: 'user', model: 'User' },
          { path: 'category', model: 'Category' },
        ]
      }
    ]).exec((err, item) => {
      if (err) { return res.send(err); }
      res.status(200).json({isSuccessful:true,data:item});
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
        res.status(200).json({ data:docs, isSuccessful: true });
      });
    }
  };

}
