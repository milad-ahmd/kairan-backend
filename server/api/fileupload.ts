import * as express from 'express'
import UploadCtrl from '../controllers/fileupload'
import UserCtrl from '../controllers/user'

const router = express.Router()
const userCtrl = new UserCtrl()
const uploadCtrl = new UploadCtrl()

router.route('/image').post(uploadCtrl.upload)
router.route('/video').post(uploadCtrl.uploadVideo)
router.route('/image').get(uploadCtrl.getAll)
router.route('/image').put(uploadCtrl.update)
router.route('/pdf').post(uploadCtrl.uploadPdf)

export default router