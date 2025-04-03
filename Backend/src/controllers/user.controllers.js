import httpStatus from "http-status";
import { User } from "../models/user.model.js";
import { Meeting } from "../models/meetingModel.js";
import bcrypt, { hash } from "bcrypt";

import crypto from "node:crypto";


export const register = async (req,res,next) => {
    try{
      let {name, username, password, email} = req.body;
       const existingUser = await User.findOne({name});

       if(existingUser){
         console.log({existingUser});
        return res.status(httpStatus.OK).json({message:"user already register", success: "info"});
       };

       if(!name || !username || !password || !email){
        return res.json({message:"Please fill out all required fields.", success:"warning"});
       };

       const hashPassword = await bcrypt.hash(password, 10);

       const newUser = new User ({
        name: name,
        username: username,
        email: email,
        password: hashPassword,
       });
       await newUser.save();
       console.log(newUser);
       return res.status(httpStatus.CREATED).json({message:"user successfully registered", success:"success"});
    }catch(err){
        console.log(err);
        res.json({message:"something went wrong" , success:"error"});
    }
}

export const login = async(req,res,next)=>{

   try{
      let {username, email, password} = req.body;

      if(!username || !email || !password){
         return res.json({message: "Please fill out all required fields.", success: "warning"})
      }
   
      let user = await User.findOne({email});
   
      if(!user){
         return res.json({message:"this user is not registerd", success: "info"});
      }
      let checkPassword = await bcrypt.compare(password, user.password);
      console.log(checkPassword);
   
      if(!checkPassword){
        return res.json({message:"password is wrong", success:"error"});
      }
      let token = crypto.randomBytes(20).toString("hex");
      user.token = token; 
      console.log(user);
      await user.save();
     return res.status(httpStatus.OK).json({message: "user logged in successfully", success:"success", token: token})
   }catch(err){
      console.log(err)
      return res.status(httpStatus.FORBIDDEN).json({message:"something went wrong", success:"error"});
   }
   
}


export const addHistory = async(req,res,next) =>{
  try{
   let meetingCode = req.body.meetingCode;
   let token = req.body.token;
   console.log(token);
   let user = await User.findOne({token});
   // console.log(user);
   
   let newMeeting = new Meeting({
      user_id: user.email,
      meetingCode: meetingCode
   })
   
   newMeeting.save();
   res.status(httpStatus.CREATED).json({success: true});

  }catch(e){
   console.log(e);
  }
  
}

export const getHistory = async(req,res,next) =>{
   try{

      let token = req.body.token;
      // console.log(token);
      let user = await User.findOne({token});
      let mainId = user.email;
      console.log(mainId);
      let getMeetings = await Meeting.find({user_id: mainId});
      console.log(getMeetings);
      res.json({getMeetings});
      
   }catch(e){
      console.log(e);
   }
} 