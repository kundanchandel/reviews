const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the Schema
const ProductSchema = new Schema({
  productName:{
    type:String,
    required:true
  },
  productDescription: {
    type: String,
    required: true
  },
  comments:[{
      type:mongoose.Schema.Types.ObjectId,
      ref:"comments"
  }],
  photoUrl: {
    type: String,
    required:true
  
    },
    category:{
        type:String,
        required:true
    },
    subCategory:{
        type:String,
        required:true
    },
    avgRating:{
        type:Number
    },
    authorRating:{
      type:Number,
      required:true
    },
    createdAt:{
      type:Date,
      default:Date.now()
    }
});

module.exports = Product = mongoose.model("products", ProductSchema);