"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var moment = require('moment-timezone');
var mongoosePaginate = require("mongoose-paginate-v2");
var userInfoSchema = new mongoose.Schema({
    country: String,
    user_id: String,
    city: String,
    exchange_name: String,
    description: String,
    currencies: [String],
    location: {
        lat: { type: Number, default: 0 },
        lng: { type: Number, default: 0 }
    },
    address: String,
    deleted: { type: Boolean, default: false },
    score: { type: Number, default: 0 },
    created_at: { type: Number, "default": moment().tz('Asia/Tehran').unix() },
    updated_at: { type: Number, "default": moment().tz('Asia/Tehran').unix() }
});
userInfoSchema.plugin(mongoosePaginate);
var UserInfo = mongoose.model('UserInfo', userInfoSchema);
exports.default = UserInfo;
//# sourceMappingURL=userInfo.js.map