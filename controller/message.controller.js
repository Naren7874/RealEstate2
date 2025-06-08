import prisma from "../lib/prisma.js";

export const addMessage = async (req, res) => {
  const tokenUserId = req.userId;
  const chatId = req.params.chatId;
  const text = req.body.text?.trim(); // Trim whitespace and handle undefined

  try {
    // Validate message text
    if (!text || text.length === 0) {
      return res.status(400).json({ message: "Message text cannot be empty!" });
    }

    // Verify chat exists and user is a participant
    const chat = await prisma.chat.findUnique({
      where: {
        id: chatId,
        userIDs: {
          hasSome: [tokenUserId],
        },
      },
    });

    if (!chat) {
      return res.status(404).json({ message: "Chat not found!" });
    }

    // Create the new message
    const message = await prisma.message.create({
      data: {
        text,
        chatId,
        userId: tokenUserId,
      },
    });

    // Update chat's last message and seen status
    await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        // Add current user to seenBy if not already present
        seenBy: {
          set: Array.from(new Set([...chat.seenBy, tokenUserId]) )// Ensures no duplicates
        },
        lastMessage: text,
        updatedAt: new Date() // Requires updatedAt field in schema
      },
    });

    res.status(200).json(message);
  } catch (err) {
    console.error(err); // Use console.error for errors
    res.status(500).json({ message: "Failed to add message!" });
  }
};