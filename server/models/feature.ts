import * as mongoose from 'mongoose';
import moment = require("moment-timezone");
import * as mongoosePaginate from 'mongoose-paginate-v2';

const featureSchema = new mongoose.Schema({
  title:String,
  titleEn:String,
  created_at: { type: Number, "default": moment().unix() },
  updated_at: { type: Number, "default": moment().unix() }
});
featureSchema.plugin(mongoosePaginate);

const Feature = mongoose.model('Feature', featureSchema);

export default Feature;