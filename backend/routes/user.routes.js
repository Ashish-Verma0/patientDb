const express=require("express")
const { createUser, loginUser } = require("../controllers/user.controller")

const userRoutes=express.Router()

userRoutes.post("/create",createUser)
userRoutes.post("/login",loginUser)

module.exports=userRoutes