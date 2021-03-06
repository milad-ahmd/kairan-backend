import * as express from 'express'
import UserCtrl from '../controllers/user'
import MeetingCtrl from '../controllers/meeting';

const router = express.Router()
const userCtrl = new UserCtrl()
const ctrl = new MeetingCtrl()


router.route('/save').post(userCtrl.jwtTokenValidation, ctrl.save)
router.route('/update').put(userCtrl.jwtTokenValidation, ctrl.update)
router.route('/all').get(ctrl.getAll)
router.route('/getAll/:page').get(ctrl.getByFilterPaginationCustom)
router.route('/filter').get(ctrl.getByFilter)
router.route('/get-one/:id').get(ctrl.getOne)
router.route('/get-access-time-sheet/:id/:date').get(ctrl.getAccessTimeSheet)
router.route('/multiple').put(ctrl.updateAll)

export default router
