import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const register = async (req , res) =>{

    try{

        const {userName , email , password } = req.body;


        const UserExists = await User.findOne({email})

        if(UserExists){
            return res.status(403).json({
                success : false,
                message : "User exist with this email"
            })
        }

        if(!userName || !email || !password){
            return res.status(403).json({
                success : false,
                message : "Fill all tabs"
            })
        }

        if(userName.length < 3){
            return res.status(403).json({
                success : false,
                message : "UserName should be greater then 3 characters"
            })
        }
        if(password.length < 3){
            return res.status(403).json({
                success : false,
                message : "UserName password be greater then 3 characters"
            })
        }

        const hashedPassword = await bcrypt.hash(password , 10);

        const response = await User.create({
            userName ,
            email ,
            password : hashedPassword
        })

        return res.status(200).json({
            success : true,
            message : "User registered successfully"
        })


    }catch(err){
        console.log("Error while user registration " ,err)
        return res.status(500).json({
            success : false,
            message : "Error while user registration "
        })
    }


}






export const login = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      if (!email || !password) {
        return res.json({
          success: false,
          message: "Please fill all the fields",
        });
      }
  
      let user = await User.findOne({ email });
  
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "The User does not exist with this email",
        });
      }
  
      const payload = {
        email: user.email,
        id: user._id,
      };
  
      if (await bcrypt.compare(password, user.password)) {
        let token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: '3d' ,
        });
  
        user = user.toObject();
        user.token = token;
        user.password = undefined;
  
        const options = {
          expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', // HTTPS in production
          sameSite: 'Lax', // Change this based on your use case
        };
  
        res.cookie("token", token, options).status(200).json({
          success: true,
          token,
          user,
          message: "Logged in",
        });
      } else {
        return res.status(403).json({
          success: false,
          message: "Password does not match. Try again.",
        });
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({
        success: false,
        message: "Error while logging in",
      });
    }
  };
  