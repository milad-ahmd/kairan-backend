import { ResponseContent } from '../base/responseContent'
import Client from '../models/client'
import BaseCtrl from './base'

export default class ClientCtrl extends BaseCtrl {
  model = Client
  response: ResponseContent
}
