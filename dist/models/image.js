"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var moment = require("moment-timezone");
var mongoosePaginate = require("mongoose-paginate-v2");
var imageSchema = new mongoose.Schema({
    title: String,
    url: String,
    deleted: { type: Boolean, default: false },
    created_at: { type: Number, "default": moment().unix() },
    updated_at: { type: Number, "default": moment().unix() }
});
imageSchema.plugin(mongoosePaginate);
var Image = mongoose.model('Image', imageSchema);
exports.default = Image;
//# sourceMappingURL=image.js.map