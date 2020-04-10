import * as express from 'express'
import UploadCtrl from '../controllers/fileupload'
import UserCtrl from '../controllers/user'

const router = express.Router()
const userCtrl = new UserCtrl()
const uploadCtrl = new UploadCtrl()

router.route('/image').post(userCtrl.jwtTokenValidation, uploadCtrl.upload)

export default router
