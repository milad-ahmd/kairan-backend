import * as bcrypt from 'bcryptjs';
import * as mongoose from 'mongoose';
const moment = require('moment-timezone');
import * as mongoosePaginate from 'mongoose-paginate-v2';

const userSchema = new mongoose.Schema({
  username: {type:String,unique: true},
  password: {type: String, required: true, default: '123456'},
  avatar: String,
  first_name: String,
  last_name: String,
  activationCode: String,
  role:{type:String,enum:['user','admin'],default:'user'},
  deleted: {type: Boolean, default: false},
  is_active: {type: Boolean,  default: false},
  is_verify: {type: Boolean,  default: false},
  created_at: { type: Number, "default": moment().tz('Asia/Tehran').unix() },
  updated_at: { type: Number, "default": moment().tz('Asia/Tehran').unix() }
});
// Before saving the user, hash the password
userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }
    console.log(user.password);
    bcrypt.hash(user.password, salt, function (error, hash) {
      if (error) {
        return next(error);
      }
      console.log(hash);
      user.password = hash;
      next();
    });
  });
});
userSchema.pre('findOneAndUpdate', function (next) {
  const user = this;
  if (!user._update.password) {
    return next();
  }
  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user._update.password, salt, function (error, hash) {
      if (error) {
        return next(error);
      }
      user._update.password = hash;
      next();
    });
  });
});
userSchema.methods.comparePassword = function (candidatePassword, callback) {
  console.log(candidatePassword, this.password)
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};
// Omit the password when returning a user
userSchema.set('toJSON', {
  transform: function (doc, ret, options) {
    delete ret.password;
    return ret;
  }
});
userSchema.plugin(mongoosePaginate)

const User = mongoose.model('User', userSchema);

export default User;
