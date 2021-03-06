const mongoose = require("mongoose");
const User = mongoose.model("users");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const dotenv=require('dotenv');
dotenv.config();

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.googleClientID,
      clientSecret: process.env.googleClientSecret,
      callbackURL: "/auth/google/callback",
      proxy: true
    },

    async(accessToken, refreshToken, profile, done) => {
     
      const newUser={
        googleID:profile.id,
        displayName:profile.displayName,
        email:profile.emails[0].value,
        photo:profile.photos[0].value,
        
      }
      try {
        let user=await User.findOne({googleID:profile.id})
        
        if(user){
          done(null,user)
        }else{
          user=await User.create(newUser)
          
          done(null,user)
        }
      } catch (error) {
        console.log(error)
      }
    }
  )
);