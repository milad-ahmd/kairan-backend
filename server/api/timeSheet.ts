import * as express from 'express'
import UserCtrl from '../controllers/user'
import TimeSheetCtrl from '../controllers/timeSheet';

const router = express.Router()
const userCtrl = new UserCtrl()
const ctrl = new TimeSheetCtrl()


router.route('/save').post(userCtrl.jwtTokenValidation, ctrl.insert)
router.route('/update').put(userCtrl.jwtTokenValidation, ctrl.update)
router.route('/all').get(ctrl.getAll)
router.route('/getAll/:page').get(ctrl.getByFilterPaginationCustom)
router.route('/filter').get(ctrl.getByFilter)
router.route('/get-one/:id').get(ctrl.getOne)
router.route('/multiple').put(ctrl.updateAll)

export default router
