import * as mongoose from 'mongoose';
import moment = require("moment-timezone");
import * as mongoosePaginate from 'mongoose-paginate-v2';

const timeSheetSchema = new mongoose.Schema({
    meet:String,
    day: String,//{type:String,enum:['sun','mon','tue','wed','thu','fri','sat'],default:'sun'},
    startTime: String,
    endTime: String,
    price: Number,
    per: { type: String, enum: ['night', 'day', 'hour'], default: 'hour' },
    is_active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    created_at: { type: Number, "default": moment().unix() },
    updated_at: { type: Number, "default": moment().unix() }
});
timeSheetSchema.plugin(mongoosePaginate)
const TimeSheet = mongoose.model('TimeSheet', timeSheetSchema);

export default TimeSheet;