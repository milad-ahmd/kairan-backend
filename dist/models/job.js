"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var moment = require("moment-timezone");
var mongoosePaginate = require("mongoose-paginate-v2");
var jobSchema = new mongoose.Schema({
    title: String,
    titleEn: String,
    description: String,
    descriptionEn: String,
    type: String,
    skills: [String],
    deleted: { type: Boolean, default: false },
    created_at: { type: Number, "default": moment().unix() },
    updated_at: { type: Number, "default": moment().unix() }
});
jobSchema.plugin(mongoosePaginate);
var Job = mongoose.model('Job', jobSchema);
exports.default = Job;
//# sourceMappingURL=job.js.map