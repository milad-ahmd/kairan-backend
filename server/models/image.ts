import * as mongoose from 'mongoose';
import moment = require("moment-timezone");
import * as mongoosePaginate from 'mongoose-paginate-v2';

const imageSchema = new mongoose.Schema({
  title:String,
  url:String,
  deleted:{type:Boolean, default:false},
  created_at: { type: Number, "default": moment().unix() },
  updated_at: { type: Number, "default": moment().unix() }
});
imageSchema.plugin(mongoosePaginate)
const Image = mongoose.model('Image', imageSchema);

export default Image;
