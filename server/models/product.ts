import * as mongoose from 'mongoose';
import moment = require("moment-timezone");
import * as mongoosePaginate from 'mongoose-paginate-v2';

const servicesSchema = new mongoose.Schema({
  title:String,
  titleEn:String,
  logo:String,
  image:String,
  description:String,
  descriptionEn:String,
  manager:String,
  customer:String,

  deleted:{type:Boolean, default:false},
  created_at: { type: Number, "default": moment().unix() },
  updated_at: { type: Number, "default": moment().unix() }
});
servicesSchema.plugin(mongoosePaginate);

const Services = mongoose.model('Services', servicesSchema);

export default Services;
