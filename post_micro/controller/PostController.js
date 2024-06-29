import prisma from "../config/db.config.js";
import axios from "axios";

class PostController {
  static async index(req, res) {
    try {
      const posts = await prisma.post.findMany({});

      // * Method 1 - to get user details from Auth Micro for each Post
      let postWithUsers = await Promise.all(
        posts.map(async (post) => {
          const res = await axios.get(
            `${process.env.AUTH_MICRO_URL}/api/getUser/${post.user_id}`
          );
          console.log("the user res", res.data);
          return {
            ...post,
            ...res.data,
          };
        })
      );

      return res.json({ postWithUsers })
    } catch (error) {
      console.log("the post fetch error is", error);
      return res.status(500).json({ message: "Something went wrong." });
    }
  }

  static async store(req, res) {
    try {
      const authUser = req.user;
      const { title, content } = req.body;
      const post = await prisma.post.create({
        data: {
          user_id: authUser.id,
          title,
          content,
        },
      });

      return res.json({ message: "Post created successfully!", post });
    } catch (error) {
      return res.status(500).json({ message: "Something went wrong." });
    }
  }
}

export default PostController;
