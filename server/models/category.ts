import * as mongoose from 'mongoose';
import moment = require("moment-timezone");
import * as mongoosePaginate from 'mongoose-paginate-v2';

const categorySchema = new mongoose.Schema({
  title:String,
  image:String,
  banner:String,
  description:String,
  deleted:{type:Boolean, default:false},
  created_at: { type: Number, "default": moment().unix() },
  updated_at: { type: Number, "default": moment().unix() }
});
categorySchema.plugin(mongoosePaginate)
const Category = mongoose.model('Category', categorySchema);

export default Category;
