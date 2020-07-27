const passport = require("passport");
const express = require("express");
const app = express();
const Product=require('../../models/Product');
const Comment=require('../../models/Comment');
const User=require('../../models/User');
module.exports = app => {
   app.get('/product/allProducts',(req,res)=>{
        
       Product.find({}).then(products=>{
           res.status(200).json(products)
           
       }).catch(err=>res.json(err))
    })
    app.post('/product/add',(req,res)=>{
        const newProduct={
            productName:req.body.productName,
            productDescription:req.body.productDescription,
            category:req.body.category,
            subCategory:req.body.subCategory,
            authorRating:req.body.authorRating,
            photoUrl:req.body.photoUrl
        }
        Product.create(newProduct).then(product=>{
            res.status(200).json(product)
        }).catch(err=>res.json(err))
    })
    app.patch('/product/update/:id',(req,res)=>{
        
        Product.findById({_id:req.params.id}).then(product=>{
            product.productName=req.body.productName,
            product.productDescription=req.body.productDescription,
            product.category=req.body.category,
            product.subCategory=req.body.subCategory,
            product.authorRating=req.body.authorRating,
            product.photoUrl=req.body.photoUrl
            product.save().then(product=>{
                res.json(product)
            }).catch(err=>res.json(err))
        }).catch(err=>res.json(err))
    })
    app.get('/product/:id',(req,res)=>{
        console.log(req.body)
        Product.findById(req.params.id).populate('comments').exec(function(err,product){
            if(err){
                console.log(err);
            } else{
                var total = 0;
                var totalComments=0
                for(var i = 0; i < product.comments.length; i++) {
                    
                    total += product.comments[i].rating;
                    totalComments+=1
                    
                }
                var avg = total / product.comments.length;
                res.json( {product: product, ratingAverage: avg,totalComments:totalComments});
            }
        })
        
    })
    app.get('/product/subcatwise/:subcatname',(req,res)=>{
        Product.find({subCategory:req.params.subcatname}).then(products=>{
            res.json(products)
            
        }).catch(err=>console.log(err))
    })
    app.get('/product/cat/:catname',(req,res)=>{
        Product.find({category:req.params.catname}).then(products=>{
            res.json(products)
            
        }).catch(err=>console.log(err))
    })
};