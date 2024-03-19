import express  from "express";
const router=express.Router();
import {verifyToken} from "../utils/auth"
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

//post comment on a tweet
router.post("/:id",verifyToken,async(req,res)=>{
    let userid=req.user.id;
    let tweetid=req.params.id;
    const {content}=req.body;
    let newcomment=await prisma.comment.create({
        data:{
            userid:userid,
            tweetid:Number(tweetid),
            comment:content,

        }
    })
    res.send({comment:newcomment})
})
//get all comments on one tweet
router.get("/:id",verifyToken,async(req,res)=>{
    const tweetid=req.params.id;
    const allComments=await prisma.tweet.findMany({
        where:{
            id:Number(tweetid),
        },
        include:{
            comment:true,
        }
    })
    res.send({Comments:allComments})
    
})

//delete a comment
router.delete("/:id",verifyToken,async(req,res)=>{
    const userid=req.user.id;
    const commentid=req.params.id;
    const reqcomment=await prisma.comment.findUnique({
        where:{
            id:Number(commentid),
        }

    })
    if(!reqcomment){
        return res.send("comment does not exist");
    }
    if(reqcomment.userid!=userid){
        return res.send("you are not authorised to delete ");
    }
    const deleted=await prisma.comment.delete({
        where:{
            id:reqcomment.id
        }
    })
    res.send("comment deleted successfully");

})

//edit a comment
router.put("/:id",verifyToken,async(req,res)=>{
    const userid=req.user.id;
    const commentid=req.params.id;
    const {newcomment}=req.body;


    const comment=await prisma.comment.findUnique({
        where:{
            id:Number(commentid),
        }

    })
    if(!comment){
        return res.send("comment does not exist");
    }
    if(comment.userid!=userid){
        return res.send("you are not authorised to edit ");
    }

    const updated=await prisma.comment.update({
        where:{
            id:Number(commentid),

        },
        data:{
            comment:newcomment,
        }
    })
    res.send({updatedComment:updated});
})
export default router;