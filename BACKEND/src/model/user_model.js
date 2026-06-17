import mongoose from 'mongoose'
import {ValidName,ValidEmail,ValidGender,ValidPassword,ValidMobile,ValidPincode} from '../validation/validation.js'

const userSchema = new mongoose.Schema({
    userImg: { type: Object },
    avatar: { type: Object, default: 'https:/' },
    firstname: { type: String, required: [true, 'Name is required...'], trim: true, validate: [ValidName, 'name is not valid...'] },
    lastname: { type: String, required: [true, 'last name is required...'], validate: [ValidName, 'Invalid last name'], trim: true },
    gender: { type: String, required: true, enum: ['male', 'female', 'other'], trim: true },
    mobile: { type: Number, required: [true, 'mobile no is required'], validate: [ValidMobile, 'invalid mobile number'], unique: true },
    email: { type: String, required: [true,'email is required'],validate:[ValidEmail,'invalid email...'], unique: true, lowercase: true },
    password: { type: String, required: true, trim: true },
    role: { type: String, enum: ['user', 'admin'] },
    addresslist: [
        {
            pincode: { type: Number, default: null },
            city: { type: String, dafault: null },
            state: { type: String, default: null },
            landmark: { type: String, default: null },
        },
    ],
    isaddress: { type: Boolean, default: false },
    verification: {
        user: {
            logininfo: [{ info: Object, default: {} }],
            otp: { type: String, default: null },
            otpExpiryTime: { type: Number, default: null },
            isDelete: { type: Boolean, default: false },
            isVerify: { type: Boolean, default: false },
            otpAtm: { type: Number, default: 3 },
            otpBlockTime: { type: Number, default: null },
            otpblockStatus: { type: String, enum: ['1m', '5m', '10m', '1h', '24h', '1w', '1m', '1y', '10y'] },
            blockAcc: { type: Boolean, default: false },
            blockReason: { type: String, default: null },
        },
        admin:{
            logininfo:[{info:Object,default:{}}],
        }

    }
},
    {timestamps:true}
)

export const user_model=mongoose.model('user',userSchema)