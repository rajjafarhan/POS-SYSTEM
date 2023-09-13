import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

export const comparePassword=(password,hash)=>{
    return bcrypt.compare(password,hash) 
 } //this function will compare the password , the one user is sending to us and the hash one which is stored in the databasae ,return true or false
 
 export const hashPassword=(password)=>{
     return bcrypt.hash(password,5)
 } //this function will hash the password and return it 
 
 
 export const createJWT=(user)=>{
     const token=jwt.sign({id:user.id,username:user.username},process.env.JWT_SECRET)
     return token 
 } //this function will create the jwt token and return it


export const protect=(req,res,next)=>{
    const  bearer=req.headers.authorization
    if(!bearer ){
        return res.status(401).json({message:"Unauthorized token not found"})

    }
    const [,token]=bearer.split(" ")
    if(!token){
        return res.status(401).json({message:"Unauthorized token not found"})
    }
    try{
        const user=jwt.verify(token,process.env.JWT_SECRET)
        req.user=user
        next()
    }
    catch(error){
        return res.status(401).json({message:"Unauthorized token not found"})
    }
}