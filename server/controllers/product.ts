import { ResponseContent } from '../base/responseContent'
import Product from '../models/product'
import BaseCtrl from './base'

export default class ProductCtrl extends BaseCtrl {
  model = Product
  response:ResponseContent;
  options = {
    page: 1,
    limit: 10,
    sort:{order:1},
    populate:[
      { path: 'manager', model: 'Manager' },
      { path: 'customer', model: 'Client' },
    ]
  };
  getByFilterPaginationProduct = (req, res) => {
    let query = req.query;
    if(!query['deleted']){
      query['deleted'] = false;
    }else if(query['deleted']=='none'){
      delete query['deleted']
    }
    if (query['count'] && query['count'] === "1") {
      delete query['count'];
      this.model.countDocuments(query, (err, docs) => {
        if (err) { return res.send(err); }
        res.status(200).json({isSuccessful:true,count:docs});
      });
    }else{
      this.options.page = parseInt(req.params.page);
      this.model.paginate(query,this.options, (err, docs) => {
        if (err) { return res.send(err); }
        res.status(200).json({...docs,isSuccessful:true});
      });
    }
  };

}
