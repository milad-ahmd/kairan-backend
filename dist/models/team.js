"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var moment = require("moment-timezone");
var mongoosePaginate = require("mongoose-paginate-v2");
var teamSchema = new mongoose.Schema({
    name: String,
    nameEn: String,
    education: { type: String, enum: [] },
    skills: [String],
    description: String,
    descriptionEn: String,
    teamPic: String,
    manager: String,
    members: [{
            fullName: String,
            description: String,
            fullNameEn: String,
            descriptionEn: String,
            avatar: String
        }],
    deleted: { type: Boolean, default: false },
    created_at: { type: Number, "default": moment().unix() },
    updated_at: { type: Number, "default": moment().unix() }
});
teamSchema.plugin(mongoosePaginate);
var Team = mongoose.model('Team', teamSchema);
exports.default = Team;
//# sourceMappingURL=team.js.map