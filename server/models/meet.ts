import * as mongoose from 'mongoose';
import moment = require("moment-timezone");
import * as mongoosePaginate from 'mongoose-paginate-v2';

const meetSchema = new mongoose.Schema({
  category:String,
  user:String,
  day:[String],//{type:String,enum:['sun','mon','tue','wed','thu','fri','sat'],default:'sun'},
  startTime:Number,
  endTime:Number,
  description:String,
  price:Number,
  per:{type:String,enum:['night','day','hour'],default:'hour'},
  is_active: {type: Boolean,  default: true},

  deleted:{type:Boolean, default:false},
  created_at: { type: Number, "default": moment().unix() },
  updated_at: { type: Number, "default": moment().unix() }
});
meetSchema.plugin(mongoosePaginate)
const Meet = mongoose.model('Meet', meetSchema);

export default Meet;