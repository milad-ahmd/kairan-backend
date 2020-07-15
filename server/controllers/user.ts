import User from '../models/user'
import BaseCtrl from './base'
import JWTctrl from './authcontroller'
import * as bcrypt from 'bcryptjs'

export default class UserCtrl extends BaseCtrl {
  model = User
  options = {
    page: 1,
    limit: 10
  }

  rand(min, max) {
    var prev
    var num = Math.floor(Math.random() * (max - min + 1) + min)
    return prev = num === prev && min !== max ? this.rand(min, max) : num
  }
  editProfile=(req,res)=>{
    delete req.body.username
    delete req.body.role
    this.model.findOneAndUpdate({ _id: req.body._id }, req.body, {new: false}, (err,doc) => {
      if (err) { return res.send(err); }
      res.status(200).json({isSuccessful:true,data:doc});
    });
  }
  register = (req, res) => {
    this.model.findOne({ username: req.body.username }, (err, user) => {
      const resp = { isSuccessful: true, message: 'Successfully Created a user', result: '', id: '', code: '', data: {} }
      // check if user exist with defined email
      if (user) {
        resp.result = user._id
        resp.isSuccessful = false
        resp.message = 'User already Exist'
        return res.json(resp)
      }
      let activationCode = this.rand(999, 10000)
      const obj = new this.model(req.body)
      obj.activationCode = activationCode
      obj.save((err, user) => {
        if (err && err.code === 11000) {
          return res.status(400).json({ isSuccessful: false, message: 'Duplicate key error' })
        }
        if (err) {
          return res.json({ isSuccessful: false, message: err })
        }
        const token = JWTctrl.create({ user: user })
        const refresh_token = JWTctrl.createRefreshToken({ user: user })
        resp.result = user._id
        resp.code = activationCode
        resp.message = 'User Successfully Created'
        resp.isSuccessful = true
        resp.data = {
          access_token: token,
          refresh_token: refresh_token,
          user_id: user._id,
          role: user.role
        }

        return res.json(resp)
      })
    })
  }
  login = (req, res) => {
    this.model.findOne({ username: req.body.email, is_active: true }, (err, user) => {
      console.log(user)
      if (!user) {
        return res.status(200).json({
          isSuccessful: false,
          message: 'user does not exist'
        })
      }
      user.comparePassword(req.body.password, (error, isMatch) => {
        if (!isMatch) {
          return res.status(200).json({
            isSuccessful: false,
            message: 'username or password is invalid'
          })
        }
        // const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
        const token = JWTctrl.create({ user: user })
        const refresh_token = JWTctrl.createRefreshToken({ user: user })
        return res.status(200).json({
          isSuccessful: true,
          data: {
            access_token: token,
            refresh_token: refresh_token,
            user_id: user._id,
            role: user.role
          }
        })
      })
    })
  }
  loginAdmin = (req, res) => {
    this.model.findOne({ email: req.body.username }, (err, user) => {
      if (!user) {
        return res.sendStatus(403)
      }
      user.comparePassword(req.body.password, (error, isMatch) => {
        if (!isMatch) {
          return res.sendStatus(403)
        }
        const token = JWTctrl.createAdminToken({ user: user })
        res.status(200).json({ access_token: token, user_id: user._id, role: user.role })
      })
    })
  }
  verify = (req, res) => {
    var userBody = req.body
    this.model.findOne({ username: userBody.username }, (err, user) => {
      if (err) {
        return res.send(err)
      }
      if (user) {
        if (user.activationCode === userBody.activationCode) {
          this.model.findOneAndUpdate({ phone: userBody.phone }, {
            '$set': {
              is_active: true,
              is_verify: true
            }
          }, (err, result) => {
            if (err) {
              //
              return res.send(err)
            }
            //                        this.xp = new XpLog(user._id, xpConfig.verify_phone, 'verify_phone')
            //                        xpCtrl.saveXpLog(this.xp).then(xpRes => {
            //                            if (xpRes) {
            return res.status(200).json({ isSuccessful: true })
            //                            }
            //                        }).catch(err => {
            //
            //                        })
          })
        } else {
          return res.status(200).json({ isSuccessful: false, message: 'activation code is not valid' })
        }
      } else {
        return res.status(200).json({ isSuccessful: false, message: 'user not found' })
      }
    })
  }
  forgetPassword = (req, res) => {
    var userBody = req.body
    this.model.findOne({ phone: userBody.phone }, (err, user) => {
      if (err) {
        return res.send(err)
      }
      if (user) {
        let activationCode = this.rand(999, 10000)
        //                smsCtrl.sendSmsRegisteration(userBody.phone, activationCode, user.username).then((smsRes) => {
        //                    if (smsRes) {
        //                        this.model.findOneAndUpdate({ phone: userBody.phone }, { "$set": { activationCode: activationCode } }, (err, result) => {
        //                            if (err) {
        //                                return res.send(err)
        //                            }
        //                            return res.status(200).json({ isSuccessful: true, activationCode: activationCode })
        //                        })
        //                    } else {
        //                        return res.status(400).json({ isSuccessful: false, message: 'cannot send sms' });
        //
        //                    }
        //                })
      } else {
        return res.status(200).json({ isSuccessful: false, message: 'user not found' })
      }
    })
  }
  resetPassword = (req, res) => {
    var userBody = req.body
    let self = this
    bcrypt.genSalt(10, function (err, salt) {
      if (err) {
        return res.send(err)
      }
      bcrypt.hash(userBody.password, salt, function (error, hash) {
        if (error) {
          return res.send(err)
        }
        userBody.password = hash
      })
      self.model.findOneAndUpdate({ phone: userBody.phone }, { '$set': { password: userBody.password } }, (err, result) => {
        if (err) {
          return res.send(err)
        }
        return res.status(200).json({ isSuccessful: true })
      })
    })

  }
  refreshToken = (req, res) => {
    this.model.findOne({ email: req.payload.user.email }, (err, user) => {
      if (!user) {
        return res.sendStatus(403)
      }
      const token = JWTctrl.create({ user: user })
      res.status(200).json({ isSuccessful: true, token: token, user_id: user._id })
    })
  }
  jwtTokenValidation = (req, res, next) => {
    try {
      const authToken = req.get('Authorization')
      if (!authToken) return res.status(401).json({ isSuccessful: false, message: 'No authorization detected' })
      const token = authToken.replace('Bearer ', '')
      const verifiedToken = JWTctrl.verify(token)
      if (verifiedToken.name == 'JwtParseError') return res.status(401).json({
        isSuccessful: false,
        message: verifiedToken.message
      })
      res.locals.accessToken = verifiedToken.token || null
      res.locals.encryptToken = verifiedToken.encrypt_token || null
      req.payload = verifiedToken
      return next()
    } catch (error) {
      return res.status(500).json(error)
    }
  }
  searchUserByEmail = (req, res) => {
    let text = req.query.text
    var user_finder: any = {}
    if (text) {
      user_finder['$or'] = []
      user_finder.$or.push({ 'email': new RegExp(text) })
      user_finder.$or.push({ 'username': new RegExp(text) })
    }
    this.model.find(user_finder).exec((err, users) => {
      if (err) {
        return res.send(err)
      }
      return res.status(200).json({ isSuccessful: true, data: users })
    })
  }
  getUserInfo = (req, res) => {
    let userId = req.payload.user._id
    this.model.findById(userId).select('username first_name last_name avatar summery role invitationCode').exec((err, user) => {
      if (err) {
        return res.send(err)
      }
      if (user) {
        res.status(200).json({ isSuccessful: true, data: user })
      } else {
        return res.status(200).json({ isSuccessful: false, message: 'user not found', statusCode: 404 })
      }
    })
  }
  getUserInvitationCode = (req, res) => {
    let userId = req.payload.user._id;
    this.model.findById(userId).select('invitationCode username').exec((err, user) => {
      if (err) {
        return res.send(err)
      }
      if (user) {
        if(user.invitationCode){
          res.status(200).json({ isSuccessful: true, data: user })
        }else{
          this.model.findOneAndUpdate({ _id: req.body._id }, {$set:{invitationCode:`${user.username.split(0,6)}-${this.rand(9999, 100000)}`}}, {new: false}, (err,doc) => {
            if (err) { return res.send(err); }
            res.status(200).json({isSuccessful:true,data:doc});
          });
        }
        res.status(200).json({ isSuccessful: true, data: user })
      } else {
        return res.status(200).json({ isSuccessful: false, message: 'user not found', statusCode: 404 })
      }
    })
  }
}