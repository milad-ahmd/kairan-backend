import * as express from 'express'
import ProductCtrl from '../controllers/product'
import UserCtrl from '../controllers/user'

const router = express.Router()
const userCtrl = new UserCtrl()
const ctrl = new ProductCtrl()


router.route('/save').post(userCtrl.jwtTokenValidation, ctrl.insert)
router.route('/update').put(userCtrl.jwtTokenValidation, ctrl.update)
router.route('/all').get(ctrl.getAllByPopulate)
router.route('/getAll/:page').get(ctrl.getByFilterPaginationProduct)
router.route('/filter').get(ctrl.getByFilter)
router.route('/get-one/:id').get(ctrl.getByPopulate)
router.route('/multiple').put(ctrl.updateAll)

export default router
