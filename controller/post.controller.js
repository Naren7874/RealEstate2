import prisma from "../lib/prisma.js";
import { v2 as cloudinary } from "cloudinary";
import jwt from "jsonwebtoken";

export const getPosts = async (req, res) => {
  const query = req.query;
  // console.log(query.property)
  try {
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type !== "any" ? query.type : undefined,
        property: query.property !== "any" ? query.property : undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || 0,
          lte: parseInt(query.maxPrice) || 10000000
        }
      }
    })
    res.status(200).json(posts);
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Failed to get posts" })
  }
}

export const getPost = async (req, res) => {
  const id = req.params.id;

  try {
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        user: {
          select: {
            username: true,
            avatar: true,
          },
        },
      },
    });

    const token = req.cookies?.token;

    if (token) {
      jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
        if (err) {
          return res.status(401).json({ message: "Invalid token" });
        }

        const saved = await prisma.savedPost.findUnique({
          where: {
            userId_postId: {
              postId: id,
              userId: payload.id,
            },
          },
        });

        return res.status(200).json({ ...post, isSaved: !!saved });
      });
      return;
    }

    return res.status(200).json({ ...post, isSaved: false });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Failed to get post" });
  }
};

export const addPost = async (req, res) => {
  const body = req.body;
  const tokenUserId = req.userId;

  try {
    let imageUrls = [];

    // Check if images exist and are in the correct format
    if (body.postData.img && Array.isArray(body.postData.img)) {
      // Filter out any empty or invalid image strings
      const validImages = body.postData.img.filter(img => 
        img && typeof img === 'string' && img.startsWith('data:image')
      );

      // Upload images to Cloudinary
      const uploadPromises = validImages.map(async (image) => {
        try {
          const uploadResponse = await cloudinary.uploader.upload(image, {
            folder: "RealEstate/Posts",
          });
          return uploadResponse.secure_url;
        } catch (uploadErr) {
          console.error("Failed to upload image:", uploadErr);
          return null;
        }
      });

      // Wait for all uploads to complete and filter out any failed uploads
      const uploadedImages = await Promise.all(uploadPromises);
      imageUrls = uploadedImages.filter(url => url !== null);
    }

    // Create the post with the uploaded image URLs
    const newPost = await prisma.post.create({
      data: {
        title: body.postData.title,
        price: parseInt(body.postData.price),
        address: body.postData.address,
        city: body.postData.city,
        bedroom: parseInt(body.postData.bedroom),
        bathroom: parseInt(body.postData.bathroom),
        type: body.postData.type,
        property: body.postData.property,
        latitude: body.postData.latitude,
        longitude: body.postData.longitude,
        img: imageUrls,
        userId: tokenUserId,
        postDetail: {
          create: {
            desc: body.postDetail.desc,
            utilities: body.postDetail.utilities,
            pet: body.postDetail.pet,
            income: body.postDetail.income,
            size: parseInt(body.postDetail.size),
            school: parseInt(body.postDetail.school),
            bus: parseInt(body.postDetail.bus),
            restaurant: parseInt(body.postDetail.restaurant)
          }
        }
      },
      include: {
        postDetail: true
      }
    });

    res.status(200).json(newPost);
  } catch (err) {
    console.error("Error in addPost:", err);
    res.status(500).json({ 
      message: "Failed to create post!",
      error: err.message 
    });
  }
};

export const updatePost = async (req, res) => {
  try {
    // Your update logic here
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Failed to update post" })
  }
}

export const deletePost = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  try {
    const post = await prisma.post.findUnique({
      where: { id }
    })
    if (post.userId !== tokenUserId) {
      return res.status(403).json({ message: "Not authorized to delete post" })
    }
    await prisma.post.delete({
      where: { id }
    })
    res.status(200).json({ message: "Post Deleted" })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: "Failed to delete post" })
  }
}