"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var moment = require("moment-timezone");
var mongoosePaginate = require("mongoose-paginate-v2");
var timeSheetSchema = new mongoose.Schema({
    meet: String,
    day: String,
    startTime: String,
    endTime: String,
    price: Number,
    per: { type: String, enum: ['night', 'day', 'hour'], default: 'hour' },
    is_active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    created_at: { type: Number, "default": moment().unix() },
    updated_at: { type: Number, "default": moment().unix() }
});
timeSheetSchema.plugin(mongoosePaginate);
var TimeSheet = mongoose.model('TimeSheet', timeSheetSchema);
exports.default = TimeSheet;
//# sourceMappingURL=timeSheet.js.map