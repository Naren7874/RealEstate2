import prisma from "../lib/prisma.js";
import argon2 from 'argon2';
import jwt from "jsonwebtoken";

export const register = async (req,res)=>{
    const {username,email,password} = req.body;

    const hashedPassword = await argon2.hash(password);

    try{
        //create new user and save to db
        const newUser = await prisma.user.create(
        {
            data:{
                username,   
                email,
                password: hashedPassword
            },
        });
    console.log(newUser);
    
    res.status(201).json({message:"User created successfully"});
    
    }
    catch(err)
    {
        console.log(err);
        res.status(500).json({message:"Failed to create new user"});
        
    }
    
}

export const  login =  async (req,res)=>{
    const { username, password } = req.body;

    try
    {
    //if user exists
    const user = await prisma.user.findUnique(
        {
            where:{username}
        }
    )
    //401 for not allowed 
    if(!user) return res.status(401).json({message:"Invalid credentials"})

    //if password is correct
    //verify(storedHash,enteredPassword)
    const isPasswordValid = await argon2.verify(user.password,password);
    if(!isPasswordValid) return res.status(401).json({message:"Invalid password!"})

    //generate coookie token and send to user
    //1 way
    //res.setHeader("Set-Cookie","test="+"myValue").json('success')

    //login session age - 1 week (in ms)
    const age = 1000*60*60*24*7
    const token = jwt.sign(
        {
            id:user.id,
            //for role based
            isAdmin:false
        },
        process.env.JWT_SECRET_KEY,
        {expiresIn:age}
    )
    //to send only userInfo accoet password
    const {password: userPassword,...userInfo} = user;

    //setting token name as token(when decrypted gives user.id)
    //2 way using cookieParser
    res.cookie("token",token,{
        httpOnly:true,
        //secure: true (for production)
        maxAge : age
    })
    .status(200)    
    .json(userInfo)
    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Failed to login!"})     
    }
}

export const logout = (req,res)=>{
    //clear cookie with name
    res.clearCookie("token").status(200).json({message:"Logout successful"})
   }