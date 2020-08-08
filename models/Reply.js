const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create the Schema
const ReplySchema = new Schema({
  reply:{
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
  createdAt:{
      type:Date,
      default:Date.now()
    }
});

module.exports = Comment = mongoose.model("replys", ReplySchema);