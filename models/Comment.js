const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the Schema
const CommentSchema = new Schema({
  commentTitle:{
    type:String,
    required:true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  authorName:{
    type:String,
    required:true
  },
  authorPhoto:{
    type:String,
    required:true
  },
  fullComment: {
    type: String,
    required: true
  },
  rating:{
      type:Number,
      required:true
  },
  createdAt:{
      type:Date,
      default:Date.now()
    }
});

module.exports = Comment = mongoose.model("comments", CommentSchema);