const userModel = require("../models/userModel")
const bcryptjs = require('bcryptjs')

const registerUser = async (req, res) => {
    try {
      const { password, email } = req.body;  
      const findUser = await userModel.findOne({ email });
      if (findUser) {
        return res.status(400).send({ success: false, msg: "Email already exists", status_code: 400 });
      }
        const passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
      if (!passwordRegex.test(password)) {
        return res.status(400).send({
          success: false,
          msg: "Password must be 8+ characters with a special character",
          status_code: 400,
        });
      }
        const encryptedPassword = await bcryptjs.hash(password, 12);
        const registeredUser = { ...req.body, password: encryptedPassword };
        const createNewUser = new userModel(registeredUser);
        const response = await createNewUser.save();
    
      const userData = {
        id: response._id,
        firstName: response.firstName,
        lastName: response.lastName,
        email: response.email,
        phone: response.phone,
      };
  
      console.log("User Data Sent:", userData);
      res.status(200).send({ success: true, msg: "User created", data: userData });
    } catch (error) {
      res.status(500).send({
        success: false,
        msg: "Error registering user",
        error: error.message,
      });
    }
  };
  

const loginUser =async(req,res)=>{
    try {
        const {email,password}=req.body;
        const findUser = await userModel.findOne({email: email});
        if(!findUser)return res.status(404).send({success:false,msg:"invalid credentials"});
        const check_password = await bcryptjs.compare(password,findUser.password);
        if(!check_password) return res.status(401).send({success:false,msg: "invalid credentials"});
        const { password: _, ...userData } = findUser.toObject();
        res.status(200).send({success:true, msg:"login successful", data:userData});
    } catch (error) {
        res.status(500).send({success:false,msg:"login unsuccessfull",error:error.message,})
    }
}

const registerAdminUser = async (req,res)=>{
    try {
        const findUser = await userModel.findOne({email: req.body.email});
        if(findUser) return res.send({success:false, msg: "Email already exist", status_code: 400});
        const encrypt_Password = await bcryptjs.hash(req.body.password, 12);
        const new_user= {...req.body, password:encrypt_Password, role:"admin"};
        const create_user = new userModel(new_user);
        const resp = await create_user.save();
        const user_data = {id:resp._id, first_name:resp.first_name, last_name:resp.last_name, email:resp.email , phone:resp.phone};
        res.status(200).send({success:true, msg:"Admin created", data:user_data})
    } catch (error) {
        res.status(500).send({success:false,msg:"There was an error creating the admin",error:error.message})
    }
}

const getAllUsers = async(req,res)=>{
    try {
        const users = await userModel.find({});
        if(!users.length){
            return res.status(200).send({success:true, message: "no users found"})
        }
        res.status(200).send({success:true, message:"users retrived successfully", data:users})
    } catch (error) {
        res.send({success:false,message:error.message})
    }
}

module.exports={registerUser,loginUser,registerAdminUser,getAllUsers}