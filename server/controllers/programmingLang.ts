import { ResponseContent } from '../base/responseContent'
import ProgrammingLang from '../models/programmingLang'
import BaseCtrl from './base'

export default class ProgrammingLangCtrl extends BaseCtrl {
  model = ProgrammingLang
  response:ResponseContent;
}
