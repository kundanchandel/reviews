const passport = require("passport");
const express = require("express");
const app = express();

const setRedirect=(req,res,next)=>{
  req.session.redirectTo=req.headers.referer;
  next();
}

module.exports = app => {
  app.get("/auth/test", (req, res) => {
    res.send("Auth Working properly");
  });
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email"
      ]
    }),(req,res)=>{
      console.log(req.headers)
    }
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      console.log(req.headers.referer)
             
      res.redirect("/");
    }
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);  
  });
};