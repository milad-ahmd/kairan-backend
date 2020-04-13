import * as mongoose from 'mongoose';
import moment = require("moment-timezone");
import * as mongoosePaginate from 'mongoose-paginate-v2';

const jobSchema = new mongoose.Schema({
  title:String,
  titleEn:String,
  description:String,
  descriptionEn:String,
  type:String,
  skills:[String],
  deleted:{type:Boolean, default:false},
  created_at: { type: Number, "default": moment().unix() },
  updated_at: { type: Number, "default": moment().unix() }
});
jobSchema.plugin(mongoosePaginate)
const Job = mongoose.model('Job', jobSchema);

export default Job;
