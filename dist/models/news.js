"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var moment = require("moment-timezone");
var mongoosePaginate = require("mongoose-paginate-v2");
var newsSchema = new mongoose.Schema({
    title: String,
    titleEn: String,
    image: String,
    description: String,
    descriptionEn: String,
    publish_at: { type: Number, "default": moment().unix() },
    deleted: { type: Boolean, default: false },
    created_at: { type: Number, "default": moment().unix() },
    updated_at: { type: Number, "default": moment().unix() }
});
newsSchema.plugin(mongoosePaginate);
var News = mongoose.model('News', newsSchema);
exports.default = News;
//# sourceMappingURL=news.js.map