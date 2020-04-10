"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var moment = require("moment-timezone");
var mongoosePaginate = require("mongoose-paginate-v2");
var clientSchema = new mongoose.Schema({
    title: String,
    titleEn: String,
    description: String,
    descriptionEn: String,
    image: String,
    deleted: { type: Boolean, default: false },
    created_at: { type: Number, "default": moment().unix() },
    updated_at: { type: Number, "default": moment().unix() }
});
clientSchema.plugin(mongoosePaginate);
var Client = mongoose.model('Client', clientSchema);
exports.default = Client;
//# sourceMappingURL=client.js.map