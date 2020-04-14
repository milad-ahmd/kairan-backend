import * as express from 'express'
import TicketCtrl from '../controllers/ticket'
import UserCtrl from '../controllers/user'

const router = express.Router()
const userCtrl = new UserCtrl()
const ctrl = new TicketCtrl()


router.route('/save').post(userCtrl.jwtTokenValidation, ctrl.insert)
router.route('/update').put(userCtrl.jwtTokenValidation, ctrl.update)
router.route('/all').get(ctrl.getAll)
router.route('/getAll/:page').get(ctrl.getByFilterPagination)
router.route('/filter').get(ctrl.getByFilter)
router.route('/get-one/:id').get(ctrl.get)
router.route('/multiple').put(ctrl.updateAll)

export default router