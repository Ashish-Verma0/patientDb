const mongoose=require("mongoose")

const departmentSchema=new mongoose.Schema({
    departmentName:{
        type:String
    },

},{timestamps:true})

module.exports=mongoose.model("Department",departmentSchema)