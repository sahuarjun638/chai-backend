import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            trim: true,
            unique: true,
            required: true,
            index: true,  // for searchable 
            lowercase: true,
            trim: true
        }, 
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String,  //cloudinary url
            required: true
        },
        coverImage: {
            type: String //cloudinary  url
        },
        watchHistory: [
             {
                type: mongoose.Schema.ObjectId,
                ref: Video
            }
        ],
        password: {
            type: String,
            required: [true, "Password is required"]
        },
        refreshToken: {
            type: String
        }

    }, 
    {timestamps: true}
);

userSchema.pre("save", async function(next) {
    if(!this.isModified("password")) return next();
    this.password = bcrypt.hash(this.password, 10)  //salt count 10 (gent salt 10)
    next()
});

userSchema.methods.isPassword = async function(password) {
     return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function() {
   return jwt.sign(
        {
            _id: this._id,
            email:this.email,
            userName:this.userName,
            fullName:this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET_KEY,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY_KEY
        }
    )
}
userSchema.methods.generateRefreshToken = function() {
    jwt.sign(
        {
            _id:this._id
        },
        process.env.REFRESH_TOKEN_SECRET_KEY,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY_KEY
        }
    )
}
  


export const User = mongoose.model("User", userSchema)
