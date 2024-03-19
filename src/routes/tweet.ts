import express  from "express";
const router=express.Router();
import {verifyToken} from "../utils/auth"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

router.post("/",verifyToken,async (req,res)=>{
    const {title,content}=req.body;
    const userid=req.user.id;
    let result=await prisma.tweet.create({
        data:{
            title,
            content,
            userid,
        }
    })
    console.log(result);
    res.send({result:result});

})

router.get("/",verifyToken,async (req,res)=>{

    let tweets=await prisma.tweet.findMany({
        include:{
            user:true,
        }
       
    })
    res.send({alltweets:tweets});
})
router.get("/:id",verifyToken,async(req,res)=>{
    let id=req.params.id;
    let tweet=await prisma.tweet.findUnique({
        where:{
            id:Number(id),
        }
    })
    res.send({tweet:tweet});
})
router.get("/allUsertweets",verifyToken,async(req,res)=>{
    let id=req.user.id;
    let userwithtweets=await prisma.user.findUnique({
        where:{
            id:Number(id),
        },
        include:{
            tweet:true,
        }
    })
    console.log(userwithtweets);
})

router.delete("/:id",verifyToken,async(req,res)=>{
    const userid=req.user.id;
    const tweetid=req.params.id;
    const tweet=await prisma.tweet.findUnique({
        where:{
            id:Number(tweetid),
        },
        include:{
            user:true,
        }

    })
    if(!tweet){
        return res.send("Tweet not found.");
    }
    if(tweet.userid!=userid){
        return res.send("you are not authorised to do it");
    }

    let result=await prisma.tweet.delete({
        where:{
            id:Number(tweetid),
        }
    })
    res.send({deleted:result});
})


router.put("/:id",verifyToken,async(req,res)=>{
    const userid=req.user.id;
    const tweetid=req.params.id;
    const {title,content}=req.body;


    const tweet=await prisma.tweet.findUnique({
        where:{
            id:Number(tweetid),
        },
        include:{
            user:true,
        }

    })
    if(!tweet){
        return res.send("Tweet not found.");
    }
    if(tweet.userid!=userid){
        return res.send("you are not authorised to do it");
    }

    let result=await prisma.tweet.update({
        where:{
            id:Number(tweetid),
        },
        data:{
            title:title,
            content:content,
        }

    })
    res.send("edited successfully");
})
export default router;