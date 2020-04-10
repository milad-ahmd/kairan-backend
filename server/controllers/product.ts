import { ResponseContent } from '../base/responseContent'
import Product from '../models/product'
import BaseCtrl from './base'

export default class ProductCtrl extends BaseCtrl {
  model = Product
  response:ResponseContent;

}
