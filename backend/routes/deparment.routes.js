const { createDepartment, getAllDepartents } = require("../controllers/department.contoller")

const express=require("express")

const departmentRoutes=express.Router()

departmentRoutes.post("/create",createDepartment)
departmentRoutes.get("/",getAllDepartents)
module.exports=departmentRoutes