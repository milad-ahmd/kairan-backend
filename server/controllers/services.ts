import { ResponseContent } from '../base/responseContent'
import Services from '../models/mainServices'
import BaseCtrl from './base'

export default class ServicesCtrl extends BaseCtrl {
  model = Services
  response:ResponseContent;

}
