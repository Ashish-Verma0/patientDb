const Problem=require("../models/problem.model")

const createProblem=async(req,res)=>{
    try {
        const problem=await Problem.create(req.body)

        return res.status(201).json({
            success:true,
            message:"Problem created successfully",
            data:problem
        })
    } catch (error) {
       console.log(error) 
    }
}

const getProblem=async(req,res)=>{
    try {
        const problem=await Problem.find({
            department_id:req.params.id
        })
        return res.status(200).json({
            success:true,
            message:"Problem found successfully",
            data:problem
        })
    } catch (error) {
      console.log(error)  
    }
}
module.exports={
    createProblem,getProblem
}