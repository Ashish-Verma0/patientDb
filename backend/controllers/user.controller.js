const User=require("../models/user.model")
const sendToken = require("../utils/sendToken")

const createUser=async(req,res)=>{
    try {
        const isEmailExists=await User.findOne({email:req.body.email})

        if(isEmailExists){
            return res.status(404).json({
                success:false,
                message:"Email Already Exists",
            })
        }

        const user=await User.create(req.body)

        return res.status(201).json({
            success:true,
            message:"User Created Successfully",
            data:user
        })
    } catch (error) {
        console.log(error)
    }
}

const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email }).select("+password");
  
      if (!user) {
        return res.status(404).json({
            success:false,
            message:"Email Not Found",
        })
      }
  
      const isPasswordMatched = await user.comparePassword(password);
  
      if (!isPasswordMatched) {
        return res.status(404).json({
            success:false,
            message:"Password Not Matched",
        })
      }
  
      sendToken(user, 200, res);
    } catch (error) {
     console.log(error)
    }
  };
module.exports={
    createUser,
    loginUser
}