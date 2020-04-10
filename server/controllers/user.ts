import User from '../models/user'
import Manager from '../models/manager'
import BaseCtrl from './base'
import JWTctrl from './authcontroller'
import * as bcrypt from 'bcryptjs'


const excelToJson = require('convert-excel-to-json')

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

  register = (req, res) => {
    this.model.findOne({ email: req.body.email }, (err, user) => {
      const resp = { isSuccessful: true, message: 'Successfully Created a user', result: '', id: '', code: '' }
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
//            smsCtrl.sendSmsRegisteration(obj.phone, obj.activationCode, user.username).then((smsRes) => {
//                if (smsRes) {
      obj.save((err, user) => {
        if (err && err.code === 11000) {
          return res.status(400).json({ isSuccessful: false, message: 'Duplicate key error' })
        }
        if (err) {
          return res.json({ isSuccessful: false, message: err })
        }
        resp.result = user._id
        resp.code = activationCode
        resp.message = 'User Successfully Created'
        resp.isSuccessful = true

        return res.json(resp)
      })
//                } else {
//                    return res.status(400).json({ isSuccessful: false, message: 'cannot send sms' });
//
//                }
//            })

    })
  }
  addExchange = (req, res) => {
//    const result = excelToJson({
//      sourceFile: 'server/controllers/exchanges.xlsx'
//    }).Sheet1
//
//    result.splice(0, 1)
//    let i = 0
//    for (let item of result) {
//      item['H'] = item['H']?item['H'].replace(/\s/g, ''):''
//      let user = {
//        username: `exchange${i}@gmail.com`,
//        email: `exchange${i}@gmail.com`,
//        password: '123456',
//        mainCountry: item['D'].toLowerCase(),
//        role: 'exchange',
//        is_active: true,
//        is_verify: true,
//      }
//
//      const obj = new this.model(user)
//      i++
//      obj.save((err, user) => {
//        if (user && user._id) {
//          let userInfo = {
//            country: item['D'].toLowerCase(),
//            user_id: user._id,
//            city: item['E'].toLowerCase(),
//            exchange_name: item['B'],
//            description: item['C'],
//            currencies: item['I'] ? item['I'].split(',') : [],
//            location: {
//              lat: 0,
//              lng: 0
//            }
//          }
//          const obj1 = new this.modelInfo(userInfo)
//          obj1.save((err, user) => {
//          })
//        }
//
//      })
//    }

    let currencies = []
    currencies = 'BND , BGN , CAD , CLP , COP , CRC , HRK , CZK , DKK , DOP , XCD , FJD , HKD , HUF , ISK , IDR , ILS , JMD , JPY , JOD , KES , MYR , MUR , MXN , NZD , NOK , OMR , PEN , PHP , PLN , RON , RUB , SAR , SGD , ZAR , KRW , SEK , CHF , TWD , THB , TRY , AED , VND'.split(' , ')
    for (let item of currencies) {
      let currency = {
        name: item,
        unit: item,
      }
      const obj1 = new Manager(currency)
      obj1.save((err, user) => {
      })

    }
  }
  login = (req, res) => {
    this.model.findOne({ email: req.body.username, is_active: true }, (err, user) => {
      if (!user) {
        return res.sendStatus(403)
      }
      user.comparePassword(req.body.password, (error, isMatch) => {
        if (!isMatch) {
          return res.sendStatus(403)
        }
        // const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
        const token = JWTctrl.create({ user: user })
        const refresh_token = JWTctrl.createRefreshToken({ user: user })
        res.status(200).json({
          access_token: token,
          refresh_token: refresh_token,
          user_id: user._id,
          role: user.role
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
  resendCode = (req, res) => {
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
      // if (roll.indexOf(verifiedToken.user.role) === -1) return res.status(401).json({
      //     isSuccessful: false,
      //     message: 'No authorization detected'
      // })
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
    this.model.findById(userId).select('username firstName lastName email phone level role').exec((err, user) => {
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
  getFriends = (req, res) => {
    let userId = req.payload.user._id
    this.model.findById(userId).select('friends').exec((err, user) => {
      if (err) {
        return res.send(err)
      }
      if (user) {
        this.model.find({ '_id': { '$in': user.friends }, deleted: false }, (err, docs) => {
          if (err) {
            return res.send(err)
          }
          res.status(200).json({ isSuccessful: true, data: docs })
        })
      } else {
        return res.status(200).json({ isSuccessful: false, message: 'user not found', statusCode: 404 })
      }
    })
  }
  // exchangeList = (req, res) => {
  //   let query = req.query
  //   if (!query['deleted']) {
  //     query['deleted'] = false
  //   } else if (query['deleted'] == 'none') {
  //     delete query['deleted']
  //   }
  //   this.options.page = parseInt(req.params.page)
  //   var user_populator = [
  //     { path: 'user_id', model: 'User' },
  //   ]
  //   this.modelInfo.find(query).populate(user_populator).skip((parseInt(req.params.page) - 1) * 10)
  //     .limit(10).exec((err, docs) => {
  //     this.modelInfo.countDocuments(query, (err, count) => {
  //       if (err) {
  //         return res.send(err)
  //       }
  //       return res.status(200).json({ data: docs, count, isSuccessful: true })
  //     })
  //   })
  // }
  // getOneExchange = (req, res) => {
  //   var user_populator = [
  //     { path: 'user_id', model: 'User' },
  //
  //   ]
  //   this.modelInfo.findById(req.params.id).populate(user_populator).exec((err, docs) => {
  //     return res.status(200).json({ data: docs, isSuccessful: true })
  //   })
  // }
  // searchExchange = (req, res) => {
  //   let query = { deleted: false }
  //   let queryExchanges = { deleted: false }
  //   if (req.query.country) {
  //     query['country'] = req.query.country
  //   }
  //   if (req.query.city) {
  //     query['city'] = req.query.city
  //   }
  //   if (req.query.from) {
  //     queryExchanges['from'] = req.query.from
  //   }
  //   if (req.query.to) {
  //
  //     queryExchanges['to'] = req.query.to
  //   }
  //   if (req.query.exchange_name) {
  //     queryExchanges['exchange_name'] = req.query.exchange_name
  //   }
  //   var user_populator = [
  //     { path: 'user_id', model: 'User' },
  //     { path: 'user_info_id', model: 'UserInfo' },
  //   ]
  //   this.modelInfo.find(query).exec((err, docs) => {
  //     let ids = []
  //     docs.forEach(item => {
  //       ids.push(item._id)
  //     })
  //     this.modelExchanges.find({
  //       ...queryExchanges,
  //       user_info_id: { $in: ids }
  //     }).populate(user_populator).exec((err, data) => {
  //       return res.status(200).json({ data: data, users: docs, isSuccessful: true })
  //     })
  //   })
  // }
}

