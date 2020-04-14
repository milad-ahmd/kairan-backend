"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var moment = require("moment-timezone");
var mongoosePaginate = require("mongoose-paginate-v2");
var ticketSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    phone: String,
    address: String,
    resumeUrl: String,
    type: String,
    job: String,
    deleted: { type: Boolean, default: false },
    created_at: { type: Number, "default": moment().unix() },
    updated_at: { type: Number, "default": moment().unix() }
});
ticketSchema.plugin(mongoosePaginate);
var Ticket = mongoose.model('Ticket', ticketSchema);
exports.default = Ticket;
//# sourceMappingURL=ticket.js.map