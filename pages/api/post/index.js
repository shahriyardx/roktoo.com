import { getSession } from "next-auth/react";
import { PostModel } from "../../../database/schema/Post";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    res.statusCode = 400;
    return res.json({ error: "Bad request" });
  }

  const posts = await PostModel.find({});
  res.json(posts);
};

export default handler;
