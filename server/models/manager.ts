import * as mongoose from 'mongoose';
import moment = require("moment-timezone");
import * as mongoosePaginate from 'mongoose-paginate-v2';

const managerSchema = new mongoose.Schema({
  name:String,
  nameEn:String,
  education:{type:String,enum:[]},
  description:String,
  descriptionEn:String,
  image:String,

  deleted:{type:Boolean, default:false},
  created_at: { type: Number, "default": moment().unix() },
  updated_at: { type: Number, "default": moment().unix() }
});
managerSchema.plugin(mongoosePaginate)
const Manager = mongoose.model('Manager', managerSchema);

export default Manager;
