import * as express from 'express'
import UserCtrl from '../controllers/user'
import CategoryCtrl from '../controllers/category'

const router = express.Router()
const userCtrl = new UserCtrl()
const ctrl = new CategoryCtrl()


router.route('/save').post(userCtrl.jwtTokenValidation, ctrl.insert)
router.route('/update').put(userCtrl.jwtTokenValidation, ctrl.update)
router.route('/all').get(ctrl.getAll)
router.route('/getAll/:page').get(ctrl.getByFilterPaginationCustom)
router.route('/filter').get(ctrl.getByFilter)
router.route('/get-one/:id').get(ctrl.get)
router.route('/multiple').put(ctrl.updateAll)

export default router
