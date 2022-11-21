const express = require('express')
const app =express();
require('dotenv').config()
const todoRoutes = require("../Router/todoRouter")
const userRoutes = require("../Router/userRouter")
const session = require('express-session')
app.use(session({
    secret: "mysecret",
    saveUninitialized:false,
    resave: false 
  }));
app.use(express.json())
app.use('/',todoRoutes)
app.use('/',userRoutes)



module.exports = app;