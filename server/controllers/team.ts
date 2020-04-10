import { ResponseContent } from '../base/responseContent'
import Team from '../models/team'
import BaseCtrl from './base'

export default class TeamCtrl extends BaseCtrl {
  model = Team
  response:ResponseContent;

}
