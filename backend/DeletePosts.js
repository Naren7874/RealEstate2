import prisma from "./lib/prisma.js";

async function deleteAllPosts() {
  try {
    await prisma.postDetail.deleteMany({});
    await prisma.post.deleteMany({});
    console.log("All posts deleted!");
  } catch (err) {
    console.error("Error deleting posts:", err);
  } finally {
    await prisma.$disconnect();
  }
}

deleteAllPosts();
