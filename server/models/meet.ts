import * as mongoose from 'mongoose';
import moment = require("moment-timezone");
import * as mongoosePaginate from 'mongoose-paginate-v2';

const meetSchema = new mongoose.Schema({
  category: String,
  user: String,
  description: String,
  images: [String],
  rateAverage: { type: Number, default: 0 },
  rateCount: { type: Number, default: 0 },
  rateSum: Number,
  userRated: [String],

  is_active: { type: Boolean, default: true },
  deleted: { type: Boolean, default: false },
  created_at: { type: Number, "default": moment().unix() },
  updated_at: { type: Number, "default": moment().unix() }
});
meetSchema.plugin(mongoosePaginate)
const Meet = mongoose.model('Meet', meetSchema);

export default Meet;