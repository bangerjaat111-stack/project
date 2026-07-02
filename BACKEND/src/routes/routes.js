import express from 'express'
import { create_user ,verifyotp} from '../controller/user_controller.js'
import multer from 'multer'

const upload = multer({ storage: multer.diskStorage({}) });

export const router = express.Router()
router.post('/create_user', upload.single("userImg"), create_user)
router.post('/verifyotp:id',verifyotp)