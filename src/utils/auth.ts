import jwt from "jsonwebtoken";
import express,{Request,Response,NextFunction} from 'express';   
const secretKey="apple"

export const createJwtToken=(user:{
    id:number;
    firstname:string;
    lastname:string;
    email:string;
    password:string;
})=>{
    return jwt.sign(user,secretKey,{expiresIn:"24h"});
}
export const verifyToken=(req:Request,res:Response,next:NextFunction)=>{
    let token=req.cookies.token;
    let decode=jwt.verify(token,secretKey);
    console.log(decode);
    if(decode){
        req.user=decode;
        return next();
    }
    res.send("token invalid")

} 

