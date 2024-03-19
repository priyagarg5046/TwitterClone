import express  from "express";
const router=express.Router();
import {verifyToken} from "../utils/auth"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

//sign-up
router.post("/",async(req,res)=>{
    const {firstname,lastname,email,password}=req.body;
    const result=await prisma.user.create({

        data:{
            firstname:firstname,lastname:lastname,email:email,password:password,
        }
    })
    console.log(result);

})

router.get("/",async(req,res)=>{
    const result=await prisma.user.findMany();
    console.log(result);
})
router.get("/:id",async(req,res)=>{
    const id=req.params.id;
    const result=await prisma.user.findUnique({
        where:{
            id:Number(id),
        }
    })
    console.log(result);
})

router.delete("/:id",verifyToken,async(req,res)=>{
    const id=req.params.id;
    const result=await prisma.user.delete({
        where:{
            id:Number(id),
        }
    })
    console.log(result);
})

router.put("/:id",verifyToken,async(req,res)=>{
    const id=req.params.id;
    const {firstname,lastname,password}=req.body;
    const result=await prisma.user.update({
        where:{
            id:Number(id),
        },
        data:{
            firstname:firstname,
            lastname:lastname,
            password:password,
        }
    })
})
export default router;