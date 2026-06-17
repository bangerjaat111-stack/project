import { user_model } from "../model/user_model.js"
import crypto, { verify } from 'crypto'
import { user_otp, resend_otp } from '../mail/mail.js'
import { errorhandling } from '../error/allerror.js'

export const create_user = async (req, res) => {
    try {
        const data = req.body
        const { firstname, lastname, email, gender, mobile, password } = data
        let expirytime = Date.now() + 1000 * 60 * 5
        let randomotp = crypto.randomInt(1000, 9999)
        if (!email) return res.status(400).send({ status: false, msg: 'email is required...' })
        const normalizedemail = email.replace(/\+(\d+)(?=@)/, '').replace(/\.(?=[^@]*@)/g, '');
        const existinguser = await user_model.findOne({ $or: [{ email: normalizedemail }, { mobile: mobile }] })
        if (existinguser) {
            if (existinguser.verification.user.isVerify) {
                return res.status(400).send({ status: false, msg: 'user already verify please login' })
            }
            await user_model.findOneAndUpdate({ email: normalizedemail },
                { $set: { 'verification.user.otp': randomotp, 'verification.user.otpExpiryTime': expirytime } }
            )
            resend_otp(firstname, lastname, email, randomotp)
            return res.status(200).send({
                status: true, msg: "resend otp send please verify your account...",
                data: { id: existinguser._id, firstname: existinguser.firstname, lastname: existinguser.lastname, email: existinguser.email }
            })

        }
        const uploaddata = {
            firstname, lastname, email: normalizedemail, gender, mobile, password, role: 'user',
            verification: { user: { otp: randomotp, otpExpiryTime: expirytime } }
        }
        user_otp(firstname, lastname, email, randomotp)
        const db = await user_model.create(uploaddata)
        res.send({
            status: true, msg: 'Create User Successfully', data:
                { id: db._id, firstname, lastname, email }
        })

    }

    catch (err) { errorhandling(err, res) }

}