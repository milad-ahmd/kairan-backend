"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var moment = require("moment-timezone");
var mongoosePaginate = require("mongoose-paginate-v2");
var currencySchema = new mongoose.Schema({
    name: String,
    unit: String,
    visible: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    created_at: { type: Number, "default": moment().unix() },
    updated_at: { type: Number, "default": moment().unix() }
});
currencySchema.plugin(mongoosePaginate);
var Currency = mongoose.model('Currency', currencySchema);
exports.default = Currency;
//# sourceMappingURL=currency.js.map