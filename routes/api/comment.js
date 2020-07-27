const passport = require("passport");
const express = require("express");
const app = express();
const Product =require('../../models/Product');
const Comment = require('../../models/Comment')

module.exports = app => {
    app.post("/comment/:product_id/",(req,res)=>{
        Product.findById(req.params.product_id,function(err,product){
            if(err){
                res.json("Error in finding product.")
            }
            else{
                var comment = {
                    commentTitle:req.body.commentTitle,
                    fullComment:req.body.fullComment,
                    rating:req.body.rating
                }
                Comment.create(comment,(err,newComment)=>{
                    if(err){
                        res.json("Error: error in adding comment.")
                    }else{
                        //add user id to comment
                        newComment.author = req.body.user_id;
                        newComment.authorName=req.body.user_name
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

    app.put("/comment/:comment_id",function(req,res){
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

    app.delete("/comment/:comment_id",function(req,res){
        Comment.findByIdAndRemove(req.params.comment_id,function(err){
            if(err){
                res.json("Error: Something went wrong while deleting")
            }else{
                res.json("Comment deleted")
            }
        });
    });


};