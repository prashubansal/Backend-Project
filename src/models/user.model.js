//Assignment
// Research vson vs json data

import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            // index: In mongoDB, if you want to make a field searchable in a optimized way, then make its "index" true
            //to enable searching field on any field
            index: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullname: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String, // cloudinary url
            required: true,
        },
        coverImage: {
            type: String, // cloudinary url
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ],
        password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }
)

// pre("event", callBack)
// do not use arrow, it does not have current context(this)
// "hash" method: takes two arguments (kisko encrypt karu, kitne layers of hashing karni hai)
// Problem: whenever we change any field of user it will encrypt the password. We do not want it.
// use isModified
userSchema.pre("save", async function(next){
    if(!this.isModified("password")) return next()

    this.password = await bcrypt.hash(this.password, 10)
    next()
})

// validate the password
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

// to generate access token
// all fields of userSchema are saved in the DB and these methods have their access
// as soon as jwt token is generated, it returns that token
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            //payload {key: data comes from DB}
            _id: this._id,
            email: this.email,
            username: this.username,
            fullname: this.fullname
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

// to generate refresh token
userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            //payload {key: data comes from DB}
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)