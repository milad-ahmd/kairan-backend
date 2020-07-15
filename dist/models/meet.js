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
    rateAverage: { type: Number, default: 0 },
    rateCount: { type: Number, default: 0 },
    rateSum: Number,
    userRated: [String],
    location: {
        lat: Number,
        lng: Number,
        details: String
    },
    website: String,
    phone: String,
    email: String,
    videoUrl: String,
    is_active: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    created_at: { type: Number, "default": moment().unix() },
    updated_at: { type: Number, "default": moment().unix() }
});
meetSchema.plugin(mongoosePaginate);
var Meet = mongoose.model('Meet', meetSchema);
exports.default = Meet;
//# sourceMappingURL=meet.js.map