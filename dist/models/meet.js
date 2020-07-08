"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var moment = require("moment-timezone");
var mongoosePaginate = require("mongoose-paginate-v2");
var meetSchema = new mongoose.Schema({
    category: String,
    user: String,
    description: String,
    images: [String],
    timeSheets: [{
            day: [String],
            startTime: String,
            endTime: String,
            price: Number,
            per: { type: String, enum: ['night', 'day', 'hour'], default: 'hour' },
        }],
    is_active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    created_at: { type: Number, "default": moment().unix() },
    updated_at: { type: Number, "default": moment().unix() }
});
meetSchema.plugin(mongoosePaginate);
var Meet = mongoose.model('Meet', meetSchema);
exports.default = Meet;
//# sourceMappingURL=meet.js.map