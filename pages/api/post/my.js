import { getSession } from "next-auth/react";
import { PostModel } from "../../../database/schema/Post";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    res.statusCode = 400;
    return res.json({ error: "Bad request" });
  }

  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return res.json({ error: "Unauthorized" });
  }

  const posts = await PostModel.find({ user_id: session.user._id }).sort({
    createdAt: -1,
  });
  res.json(posts);
};

export default handler;
