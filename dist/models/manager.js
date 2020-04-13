"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var moment = require("moment-timezone");
var mongoosePaginate = require("mongoose-paginate-v2");
var managerSchema = new mongoose.Schema({
    name: String,
    nameEn: String,
    education: { type: String, enum: [] },
    description: String,
    descriptionEn: String,
    image: String,
    order: { type: Number, default: 0 },
    deleted: { type: Boolean, default: false },
    created_at: { type: Number, "default": moment().unix() },
    updated_at: { type: Number, "default": moment().unix() }
});
managerSchema.plugin(mongoosePaginate);
var Manager = mongoose.model('Manager', managerSchema);
exports.default = Manager;
//# sourceMappingURL=manager.js.map