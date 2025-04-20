import usermodel from "../models/usermodel.js";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"



//login user
const loginuser = async(req,res) =>{
        const{email,password} = req.body;
        try {
            const user = await usermodel.findOne({email})

            if (!user) {
                return res.json({success:false,message:"User Doesnt exist"})
            }

            const ismatch = await bcrypt.compare(password,user.password)

            if (!ismatch) {
                return res.json({success:false,message:"Invalid credentials"})
            }

            const token = createtoken(user._id);
            res.json({success:true,token})

        } catch (error) {
            console.log(error);
            res.json({success:false, message:"Error"})
        }
}


const createtoken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET)
}

//register user
const registeruser = async(req,res) => {
        const {name,password,email} = req.body;
        try {
            //checking if user already exist
            const exists = await usermodel.findOne({email})
            if (exists) {
                return res.json({success:false,message:"User already exist"})
            }

            //validating email format and strong password

            if (!validator.isEmail(email)) {
                return res.json({success:false,message:"PLease enter valid email"})
            }
            
            if (password.length < 8) {
                return res.json({success:false, message:"Please enter a strong password"})
            }

            //hashing user password
            const salt = await bcrypt.genSalt(10)
            const hashedpassword = await bcrypt.hash(password,salt)

            const newuser = new usermodel({
                name: name,
                email: email,
                password: hashedpassword,
            })

            const user = await newuser.save()
            const token = createtoken(user._id)

            res.json({success:true,token})


        } catch (error) {
            console.log(error);
            res.json({success:false,message:"Error"})
        }
}


export {loginuser,registeruser}