"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var moment = require("moment-timezone");
var mongoosePaginate = require("mongoose-paginate-v2");
var meetingSchema = new mongoose.Schema({
    meet: String,
    user: String,
    timeSheet: String,
    description: String,
    date: Number,
    status: { type: String, enum: ['done', 'pending', 'accept', 'decline'], default: 'pending' },
    deleted: { type: Boolean, default: false },
    created_at: { type: Number, "default": moment().unix() },
    updated_at: { type: Number, "default": moment().unix() }
});
meetingSchema.plugin(mongoosePaginate);
var Meeting = mongoose.model('Meeting', meetingSchema);
exports.default = Meeting;
//# sourceMappingURL=meeting.js.map