import { ResponseContent } from '../base/responseContent'
import Manager from '../models/manager'
import BaseCtrl from './base'

export default class ManagerCtrl extends BaseCtrl {
  model = Manager
  response:ResponseContent;

}
