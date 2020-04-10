import { ResponseContent } from '../base/responseContent'
import News from '../models/news'
import BaseCtrl from './base'

export default class NewsCtrl extends BaseCtrl {
  model = News
  response:ResponseContent;

}
