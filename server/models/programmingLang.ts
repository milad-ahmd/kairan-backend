import * as mongoose from 'mongoose';
import moment = require("moment-timezone");
import * as mongoosePaginate from 'mongoose-paginate-v2';

const programmingLangSchema = new mongoose.Schema({
  title:String,
  image:String,
  description:String,
  descriptionEn:String,

  deleted:{type:Boolean, default:false},
  created_at: { type: Number, "default": moment().unix() },
  updated_at: { type: Number, "default": moment().unix() }
});
programmingLangSchema.plugin(mongoosePaginate);

const ProgrammingLang = mongoose.model('ProgrammingLang', programmingLangSchema);

export default ProgrammingLang;
