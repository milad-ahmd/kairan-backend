import { ResponseContent } from '../base/responseContent'
import Client from '../models/client'
import Job from '../models/job'
import BaseCtrl from './base'

export default class JobCtrl extends BaseCtrl {
  model = Job
  response: ResponseContent
}
