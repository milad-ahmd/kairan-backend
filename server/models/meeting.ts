import * as mongoose from 'mongoose';
import moment = require("moment-timezone");
import * as mongoosePaginate from 'mongoose-paginate-v2';

const meetingSchema = new mongoose.Schema({
  meet:String,
  user:String,
  description:String,
  status:{type:String,enum:['done','pending','accept','decline'],default:'pending'},
  deleted:{type:Boolean, default:false},
  created_at: { type: Number, "default": moment().unix() },
  updated_at: { type: Number, "default": moment().unix() }
});
meetingSchema.plugin(mongoosePaginate)
const Meeting = mongoose.model('Meeting', meetingSchema);

export default Meeting;