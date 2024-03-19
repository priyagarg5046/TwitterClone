import express  from "express";
const router=express.Router();
import {verifyToken} from "../utils/auth"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();


router.post("/:id",verifyToken,async(req,res)=>{
    const userid=req.user.id;
    const tweetid=req.params.id;
    let like=await prisma.like.findFirst({
        where:{
            userid:userid,
            tweetid:Number(tweetid),
        }
    })
    if(like!=null){
        await prisma.like.delete({
            where:{
                id:like.id,
            
            }
        })
        await prisma.tweet.update({
            where:{id:Number(tweetid),},
            data:{
                likecount:{decrement:1}
            }
        })
        return res.send("tweet unliked");
    }

    let newlike=await prisma.like.create({
        data:{
            userid:userid,
            tweetid:Number(tweetid),
        }
    })
    await prisma.tweet.update({
        where:{
            id:Number(tweetid),
        },
        data:{
            likecount:{
                increment:1
            }
        }
    })
    res.send({newlike});
})

router.get("/:id",verifyToken,async(req,res)=>{
    const tweetid=req.params.id;
    const likes= await prisma.like.findMany({
        where:{
            tweetid:Number(tweetid),
        },
        include:{
            user:true,
        }
        
    })
    res.send({likes:likes});
})


export default router;