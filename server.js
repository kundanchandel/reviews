const express = require("express");
const mongoose = require("mongoose");
const passport = require("passport");
const session=require("express-session");
const bodyParser = require("body-parser");
const cors=require('cors');
const path=require("path");
const dotenv=require('dotenv');
const morgan=require('morgan');

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(morgan('dev'));
require("./models/User.js");

app.use(session({
  secret:"secret lies ahead",
  resave:false,
  saveUninitialized:false,
  
}))


// MongoDB configuration


// Use mongoose to connect to mongoDB
mongoose
  .connect(process.env.mongoURI,{useNewUrlParser:true,useUnifiedTopology:true})
  .then(() => console.log("MongoDB connected successfully!"))
  .catch(err => console.log(err));

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Passport config
require("./config/passport");


//Use routes from routes folder
//app.use("/api/auth", auth);
//app.use("/api/posts", posts);

require("./routes/api/auth.js")(app);
require("./routes/api/product.js")(app);
require("./routes/api/comment.js")(app);
// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`App running on port ${port}`));