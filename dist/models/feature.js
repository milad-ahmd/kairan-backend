"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var moment = require("moment-timezone");
var mongoosePaginate = require("mongoose-paginate-v2");
var featureSchema = new mongoose.Schema({
    title: String,
    titleEn: String,
    created_at: { type: Number, "default": moment().unix() },
    updated_at: { type: Number, "default": moment().unix() }
});
featureSchema.plugin(mongoosePaginate);
var Feature = mongoose.model('Feature', featureSchema);
exports.default = Feature;
//# sourceMappingURL=feature.js.map