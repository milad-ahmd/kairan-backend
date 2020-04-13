import * as mongoose from 'mongoose';
import moment = require("moment-timezone");
import * as mongoosePaginate from 'mongoose-paginate-v2';

const servicesSchema = new mongoose.Schema({
  title:String,
  titleEn:String,
  logo:String,
  image:String,
  productImages:[],
  description:String,
  descriptionEn:String,
  manager:String,
  features:[{title:String,titleEn:String}],
  customer:String,
  order:{type:Number, default:0},
  deleted:{type:Boolean, default:false},
  created_at: { type: Number, "default": moment().unix() },
  updated_at: { type: Number, "default": moment().unix() }
});
servicesSchema.plugin(mongoosePaginate);

const Services = mongoose.model('Services', servicesSchema);

export default Services;
