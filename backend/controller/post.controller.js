import prisma from "../lib/prisma.js";
import { v2 as cloudinary } from "cloudinary";

export const getPosts = async( req,res) =>
{
    try{
        const posts = await prisma.post.findMany()
        console.log(posts)
        res.status(200).json(posts);
    } 
    catch(err)
    {
        console.log(err)
        res.status(500).json({message:"Failed to get posts"})
    }
}

export const getPost = async( req,res) =>
{
    const id = req.params.id;
    try{
        const post = await prisma.post.findUnique({
                where:{id},
                //to allow when clicking on post => postdetails and user details 
                include:{
                    postDetail: true,
                    user:{
                        select:{
                            username:true,
                            avatar:true
                        }
                    },
                }
        })
        res.status(200).json(post)

    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({message:"Failed to get post"})
    }
}

export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  try {
    let imageUrls = [];

    // 1. Upload all images to Cloudinary
    if (body.postData.img && Array.isArray(body.postData.img)) {
      const uploadPromises = body.postData.img.map(async (image) => {
        const uploadResponse = await cloudinary.uploader.upload(image, {
          folder: "RealEstate/Posts",
        });
        return uploadResponse.secure_url; // Only get the URL
      });

      imageUrls = await Promise.all(uploadPromises);
    }

    // 2. Create the Post with uploaded image URLs and nested PostDetail
    const newPost = await prisma.post.create({
      data: {
        ...body.postData,            // Spread all main post fields
        img: imageUrls,              // Replace raw base64 images with Cloudinary URLs
        userId: tokenUserId,         // Authenticated user ID from middleware
        postDetail: {
          create: body.postDetail    // Nested creation of PostDetail
        },
      },
    });

    res.status(200).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create post!" });
  }
};


export const updatePost = async( req,res) =>
{
    try{

    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({message:"Failed to update post"})
    }
}

export const deletePost = async( req,res) =>
{
    const id = req.params.id;
    const tokenUserId = req.userId;
    try{
        const post = await prisma.post.findUnique({
            where:{id}
        })
        if(post.userId!==tokenUserId)
        {
            return res.status(403).json({message:"Not authorized to delete post"})
        }
        await prisma.post.delete({
            where:{id}
        })
        res.status(200).json({message:"Post Deleted"})
    }
    catch(err)
    {
        console.log(err)
        res.status(500).json({message:"Failed to delete post"})
    }
}