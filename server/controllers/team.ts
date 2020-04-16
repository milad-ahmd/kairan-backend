import { ResponseContent } from '../base/responseContent'
import Team from '../models/team'
import BaseCtrl from './base'

export default class TeamCtrl extends BaseCtrl {
  model = Team
  response:ResponseContent;

  options = {
    page: 1,
    limit: 10,
    sort:{order:1},
    populate:[
      { path: 'manager', model: 'Manager' }
    ]
  };
  getByFilterPaginationCustom = (req, res) => {
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
