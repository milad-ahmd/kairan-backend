"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var moment = require("moment-timezone");
var mongoosePaginate = require("mongoose-paginate-v2");
var citySchema = new mongoose.Schema({
    title: String,
    country: String,
    location: {
        lat: { type: Number, default: 0 },
        lng: { type: Number, default: 0 }
    },
    visible: { type: Boolean, default: true },
    deleted: { type: Boolean, default: false },
    created_at: { type: Number, "default": moment().unix() },
    updated_at: { type: Number, "default": moment().unix() }
});
citySchema.plugin(mongoosePaginate);
var City = mongoose.model('City', citySchema);
exports.default = City;
//# sourceMappingURL=city.js.map