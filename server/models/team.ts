import * as mongoose from 'mongoose';
import moment = require("moment-timezone");
import * as mongoosePaginate from 'mongoose-paginate-v2';

const teamSchema = new mongoose.Schema({
  name:String,
  nameEn:String,
  education:{type:String,enum:[]},
  skills:[String],
  description:String,
  descriptionEn:String,
  teamPic:String,
  manager:String,
  order:{type:Number, default:0},
  members:[{
    fullName:String,
    description:String,
    fullNameEn:String,
    descriptionEn:String,
    avatar:String
  }],

  deleted:{type:Boolean, default:false},
  created_at: { type: Number, "default": moment().unix() },
  updated_at: { type: Number, "default": moment().unix() }
});
teamSchema.plugin(mongoosePaginate)
const Team = mongoose.model('Team', teamSchema);

export default Team;
