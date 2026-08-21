 import mongoose from "mongoose"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
//to encrpt we use hook 

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        index:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        
    },
    fullname:{
        type:String,
        required:true,
        trim:true,
        index:true
    },
    avatar:{
        type:String,//cloudinary url
        required:true
    },
    coverImage:{
        type:String//cloudinary url

    },
    watchHistory:[
        {
            type: Schema.Types.ObjectId,
            reference:"Video"
        }
    ],
    password:{
        type:String,
        required:[true,"password is required"]
    },
    refreshToken:{
        type:String
    }

},{timestamps:true})
//before saving if there is any modification in password encrpt it
userSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next();
    this.password=await bcrypt.hash(this.password,10 /*rounds*/)
    next()
})

//convert encrypted password into normal then compare
userSchema.methods.isPassCorrect=async function(password){
    return await bcrypt.compare(password,this.password)
}
//jwt bear token =mtlb yeh token jisk bhi pass hoga usse mai data bhj dunga
userSchema.methods.generateAccessToken=async function(){
    return await jwt.sign({
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName

    },process.env.ACCESS_TOKEN_SECRET
    ,{
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY
    }
)
}
userSchema.methods.generateRefreshToken=async function(){
    return await jwt.sign({
        _id: this._id
    },process.env.REFRESH_TOKEN_SECRET
    ,{
        expiresIn: process.env.REFRESH_TOKEN_EXPIRY
    }
)
}
export const User=mongoose.model("User",userSchema)