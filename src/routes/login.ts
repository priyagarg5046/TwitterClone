import express  from "express";
import { PrismaClient } from '@prisma/client'
import { createJwtToken } from "../utils/auth";
const prisma = new PrismaClient();

const router=express.Router();
router.post("/",async(req,res)=>{
    const {email,password}=req.body;
    const result=await prisma.user.findUnique({
        where:{
            email:email,
            password:password,
        }
    })
    if(!result){
        throw new Error("Not a valid email");
    }
    if(result.password!=password){
        throw new Error("Not a valid password");
    }
    const token=createJwtToken(result);
    res.cookie("token",token)
    console.log(token);
    res.redirect("/");
})

export default router;