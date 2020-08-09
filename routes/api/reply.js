const passport = require("passport");
const express = require("express");
const app = express();
const Reply =require('../../models/Reply');
const Comment = require('../../models/Comment');
const { response } = require("express");


module.exports = app => {

       
    app.post("/reply/:comment_id/",(req,res)=>{
        Comment.findById(req.params.comment_id,function(err,comment){
            if(err){
                res.json("Error in finding comment.")
                console.log(err);
            }
            else{
                var reply = {
                    reply:req.body.reply,
                    //author:req.body.author,
                    authorName:req.body.authorName,
                    authorPhoto:req.body.authorPhoto, 
                }
                Reply.create(reply,(err,newReply)=>{
                    if(err){
                        res.json("Error: error in adding reply.")
                        console.log(err);
                    }else{
                        newReply.save();
                        comment.replys.push(newReply);
                        comment.save();
                        res.json(newReply);
                    }
                })
            }
        })
    });  

//     app.put("/comment/:comment_id",function(req,res){
//         var updatedComment={
//             commentTitle:req.body.commentTitle,
//             fullComment:req.body.fullComment,
//             rating:req.body.rating
//         }
//         Comment.findByIdAndUpdate(req.params.comment_id,updatedComment,(err,updatedComment)=>{
//             if(err){
//                 res.json("Error: Something went wrong while updating")
//             }else{
//                res.json(updatedComment);
//             }
//         });
//     });

    app.delete("/reply/:reply_id",(req,res)=>{
        Reply.findByIdAndRemove(req.params.reply_id,function(err){
            if(err){
                res.json('reply not found')
            }else{
                Comment.findByIdAndUpdate(req.body.comment_id
                    ,{$pull:{replys:{$in:[req.params.reply_id]}}},function(err){
                        if(err){
                            res.json('could not remove from product array')
                        }
                    })
                    res.json('successfuly deleted');
            }
        })
    })
};