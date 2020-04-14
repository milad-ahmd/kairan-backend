import * as mongoose from 'mongoose';
import moment = require("moment-timezone");
import * as mongoosePaginate from 'mongoose-paginate-v2';

const ticketSchema = new mongoose.Schema({
  fullName:String,
  email:String,
  phone:String,
  address:String,
  resumeUrl:String,
  type:String,
  job:String,
  deleted:{type:Boolean, default:false},
  created_at: { type: Number, "default": moment().unix() },
  updated_at: { type: Number, "default": moment().unix() }
});
ticketSchema.plugin(mongoosePaginate)
const Ticket = mongoose.model('Ticket', ticketSchema);

export default Ticket;
