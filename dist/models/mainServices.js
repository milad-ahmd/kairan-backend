"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var moment = require("moment-timezone");
var mongoosePaginate = require("mongoose-paginate-v2");
var mainServicesSchema = new mongoose.Schema({
    title: String,
    titleEn: String,
    image: String,
    description: String,
    descriptionEn: String,
    order: { type: Number, default: 0 },
    deleted: { type: Boolean, default: false },
    created_at: { type: Number, "default": moment().unix() },
    updated_at: { type: Number, "default": moment().unix() }
});
mainServicesSchema.plugin(mongoosePaginate);
var MainServices = mongoose.model('MainServices', mainServicesSchema);
exports.default = MainServices;
//# sourceMappingURL=mainServices.js.map