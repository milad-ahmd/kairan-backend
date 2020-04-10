"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var moment = require('moment-timezone');
var mongoosePaginate = require("mongoose-paginate-v2");
var exchangesSchema = new mongoose.Schema({
    user_id: String,
    user_info_id: String,
    from: String,
    to: String,
    exchange_name: String,
    value: Number,
    deleted: { type: Boolean, default: false },
    created_at: { type: Number, "default": moment().tz('Asia/Tehran').unix() },
    updated_at: { type: Number, "default": moment().tz('Asia/Tehran').unix() }
});
exchangesSchema.plugin(mongoosePaginate);
var Exchanges = mongoose.model('Exchanges', exchangesSchema);
exports.default = Exchanges;
//# sourceMappingURL=exchanges.js.map