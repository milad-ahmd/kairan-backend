"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var moment = require("moment-timezone");
var mongoosePaginate = require("mongoose-paginate-v2");
var categorySchema = new mongoose.Schema({
    title: String,
    image: String,
    description: String,
    deleted: { type: Boolean, default: false },
    created_at: { type: Number, "default": moment().unix() },
    updated_at: { type: Number, "default": moment().unix() }
});
categorySchema.plugin(mongoosePaginate);
var Category = mongoose.model('Category', categorySchema);
exports.default = Category;
//# sourceMappingURL=category.js.map