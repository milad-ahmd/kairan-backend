import * as mongoose from 'mongoose';
import moment = require("moment-timezone");
import * as mongoosePaginate from 'mongoose-paginate-v2';

const clientSchema = new mongoose.Schema({
  title:String,
  titleEn:String,
  description:String,
  descriptionEn:String,
  image:String,
  order:{type:Number, default:0},
  deleted:{type:Boolean, default:false},
  created_at: { type: Number, "default": moment().unix() },
  updated_at: { type: Number, "default": moment().unix() }
});
clientSchema.plugin(mongoosePaginate)
const Client = mongoose.model('Client', clientSchema);

export default Client;
