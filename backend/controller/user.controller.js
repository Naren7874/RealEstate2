import { json } from "express";
import prisma from "../lib/prisma.js";
import argon2 from "argon2";
import { v2 as cloudinary } from "cloudinary";

export const getUsers = async (req, res) => {
  try {
    //findMany for multiple
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (err) {
    console.log(err.response.data.message);
    res.status(500).json({ message: "Failed to get user!" });
  }
};

export const getUser = async (req, res) => {
  try {
    //findUnique for unique user
    const id = req.params.id;
    const user = await prisma.user.findUnique({
      where: { id }, //where:{id:id}
    });
    res.status(200).json(user);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to get user!" });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { password, avatar, ...inputs } = req.body;

  if (id !== tokenUserId) {
    return res.status(403).json({ message: "Not Authorized to update!" });
  }
  try {
    let updatedPassword;
    let updatedAvatar;

    if (password) {
      updatedPassword = await argon2.hash(password);
    }

    if (avatar) {
      const uploadResponse = await cloudinary.uploader.upload(avatar, {
        folder:"/RealEstate"
      });
      updatedAvatar = uploadResponse.secure_url;
    }

    if (avatar && !updatedAvatar) {
      return res.status(400).json({ message: "Failed to upload avatar!" });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...inputs,
        ...(updatedPassword && { password: updatedPassword }),
        ...(updatedAvatar && { avatar: updatedAvatar }),
      },
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to update user!" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;
  const tokenUserId = req.userId;
  const { password, avatar, ...inputs } = req.body;

  if (id != tokenUserId) {
    return res.status(403).json({ message: "Not Authorized to update!" });
  }

  try {
    await prisma.user.delete({
      where: { id },
    });
    res.status(200).json({ message: "User deleted" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Failed to delete users!" });
  }
};