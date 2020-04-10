import * as mongoose from 'mongoose';
import moment = require("moment-timezone");
import * as mongoosePaginate from 'mongoose-paginate-v2';

const newsSchema = new mongoose.Schema({
  title:String,
  titleEn:String,
  image:String,
  description:String,
  descriptionEn:String,
  publish_at: { type: Number, "default": moment().unix() },

  deleted:{type:Boolean, default:false},
  created_at: { type: Number, "default": moment().unix() },
  updated_at: { type: Number, "default": moment().unix() }
});
newsSchema.plugin(mongoosePaginate);

const News = mongoose.model('News', newsSchema);

export default News;
