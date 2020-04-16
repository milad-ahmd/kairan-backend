import * as mongoose from 'mongoose';
import moment = require("moment-timezone");
import * as mongoosePaginate from 'mongoose-paginate-v2';
import Feature from "./feature";

const productSchema = new mongoose.Schema({
  title:String,
  titleEn:String,
  logo:String,
  image:String,
  productImages:[],
  description:String,
  descriptionEn:String,
  manager:String,
  features:[{title:String,
    titleEn:String,}],
  customer:String,
  order:{type:Number, default:0},
  deleted:{type:Boolean, default:false},
  created_at: { type: Number, "default": moment().unix() },
  updated_at: { type: Number, "default": moment().unix() }
});
productSchema.plugin(mongoosePaginate);

const Product = mongoose.model('Product', productSchema);

export default Product;