import * as mongoose from 'mongoose';
import moment = require("moment-timezone");
import * as mongoosePaginate from 'mongoose-paginate-v2';

const mainServicesSchema = new mongoose.Schema({
  title:String,
  titleEn:String,
  image:String,
  description:String,
  descriptionEn:String,
  order:{type:Number, default:0},
  deleted:{type:Boolean, default:false},
  created_at: { type: Number, "default": moment().unix() },
  updated_at: { type: Number, "default": moment().unix() }
});
mainServicesSchema.plugin(mongoosePaginate);

const MainServices = mongoose.model('MainServices', mainServicesSchema);

export default MainServices;
