import * as express from 'express'
import UserCtrl from '../controllers/user'

const router = express.Router()
const userCtrl = new UserCtrl()

router.route('/save').post(userCtrl.jwtTokenValidation, userCtrl.insert)
router.route('/update').put(userCtrl.jwtTokenValidation, userCtrl.editProfile)
router.route('/all').get(userCtrl.getAll)
router.route('/filter').get(userCtrl.jwtTokenValidation, userCtrl.getByFilter)
router.route('/get-one/:id').get(userCtrl.jwtTokenValidation, userCtrl.get)
router.route('/user').put(userCtrl.jwtTokenValidation, userCtrl.update)
router.route('/find/search').get(userCtrl.searchUserByEmail)
router.route('/get/info').get(userCtrl.jwtTokenValidation, userCtrl.getUserInfo)
router.route('/get-one/:id').get(userCtrl.jwtTokenValidation, userCtrl.get)
router.route('/multiple').put(userCtrl.updateAll)

// Users
router.route('/login').post(userCtrl.login)
router.route('/login/admin').post(userCtrl.loginAdmin)
router.route('/register').post(userCtrl.register)
router.route('/verify').post(userCtrl.verify)
router.route('/refreshToken').get(userCtrl.jwtTokenValidation, userCtrl.refreshToken)
router.route('/forgetPassword').post( userCtrl.forgetPassword)
router.route('/resetPassword').post( userCtrl.resetPassword)

export default router
