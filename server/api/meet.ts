import * as express from 'express'
import UserCtrl from '../controllers/user'
import MeetCtrl from '../controllers/meet'

const router = express.Router()
const userCtrl = new UserCtrl()
const ctrl = new MeetCtrl()


router.route('/save').post(userCtrl.jwtTokenValidation, ctrl.save);
router.route('/update').put(userCtrl.jwtTokenValidation, ctrl.update);
router.route('/set-rate/:id').put(userCtrl.jwtTokenValidation, ctrl.setRate);
router.route('/all').get(ctrl.getAll);
router.route('/getAll/:page').get(ctrl.getByFilterPaginationCustom);
router.route('/filter').get(ctrl.getByFilter);
router.route('/get-one/:id').get(ctrl.getOne);
router.route('/multiple').put(ctrl.updateAll);

export default router
