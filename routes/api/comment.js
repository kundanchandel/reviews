const passport = require("passport");
const express = require("express");
const app = express();
const Product =require('../../models/Product');
const Comment = require('../../models/Comment');
const {ensureAuth} = require("../../middleware/auth");

module.exports = app => {
    app.post("/comment/:product_id/",ensureAuth,(req,res)=>{
        Product.findById(req.params.product_id,function(err,product){
            if(err){
                res.json("Error in finding product.")
                console.log(err);
            }
            else{
                var comment = {
                    commentTitle:req.body.commentTitle,
                    fullComment:req.body.fullComment,
                    rating:req.body.rating,
                    author:req.body.user_id,
                    authorName:req.body.user_name,
                    authorPhoto:req.body.user_photo, 
                }
                Comment.create(comment,(err,newComment)=>{
                    if(err){
                        res.json("Error: error in adding comment.")
                        console.log(err);
                    }else{
                        //add user id to comment
                           
                        //save comment
                        newComment.save();
                        product.comments.push(newComment);
                        product.save();
                        res.json(newComment);
                    }
                })
            }
        })
    });  

    app.put("/comment/:comment_id",ensureAuth,function(req,res){
        var updatedComment={
            commentTitle:req.body.commentTitle,
            fullComment:req.body.fullComment,
            rating:req.body.rating
        }
        Comment.findByIdAndUpdate(req.params.comment_id,updatedComment,(err,updatedComment)=>{
            if(err){
                res.json("Error: Something went wrong while updating")
            }else{
               res.json(updatedComment);
            }
        });
    });

    app.delete("/comment/:comment_id",ensureAuth,(req,res)=>{
        Comment.findByIdAndRemove(req.params.comment_id,function(err){
            if(err){
                res.json('comment not found')
            }else{
                Product.findByIdAndUpdate(req.body.product_id
                    ,{$pull:{comments:{$in:[req.params.comment_id]}}},function(err){
                        if(err){
                            res.json('could not remove from product array')
                        }
                    })
                    res.json('successfuly deleted');
            }
        })
    })
       


};