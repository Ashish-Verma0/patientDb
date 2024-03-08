const Department=require("../models/department.model")

const createDepartment=async(req,res)=>{
    try {
       const department=await Department.create(req.body) 

       return res.status(201).json({
        success:true,
        message:"Department created successfully",
        data:department
       })
    } catch (error) {
      console.log(error)  
    }
}

const getAllDepartents=async(req,res)=>{
    try {
        const department=await Department.find()
        return res.status(200).json({
            success:true,
            message:"Department found successfully",
            data:department
           })
    } catch (error) {
        console.log(error)
    }
}

module.exports={createDepartment,getAllDepartents}