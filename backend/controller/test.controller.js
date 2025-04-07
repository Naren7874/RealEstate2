import jwt from 'jsonwebtoken'

export const shouldBeLoggedIn = async(req,res) =>
{
    console.log("\n"+req.userId);
     res.status(200).json({message:"Your are authenticated!"})
}

export const shouldBeAdmin = async (req,res)=>
{
     res.status(200).json({message:"You are authorized!"})
}
