import { ResponseContent } from '../base/responseContent'
import Client from '../models/client'
import Job from '../models/job'
import Ticket from '../models/ticket'
import BaseCtrl from './base'

export default class TicketCtrl extends BaseCtrl {
  model = Ticket
  response: ResponseContent
}
