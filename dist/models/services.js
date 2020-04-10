"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var moment = require("moment-timezone");
var mongoosePaginate = require("mongoose-paginate-v2");
var servicesSchema = new mongoose.Schema({
    title: String,
    titleEn: String,
    image: String,
    description: String,
    descriptionEn: String,
    deleted: { type: Boolean, default: false },
    created_at: { type: Number, "default": moment().unix() },
    updated_at: { type: Number, "default": moment().unix() }
});
servicesSchema.plugin(mongoosePaginate);
var Services = mongoose.model('Services', servicesSchema);
exports.default = Services;
//# sourceMappingURL=services.js.map