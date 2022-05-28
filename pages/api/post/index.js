import { PostModel } from "../../../database/schema/Post";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    res.statusCode = 400;
    return res.json({ error: "Bad request" });
  }

  const posts = await PostModel.find({ fulfilled: false }).sort({
    createdAt: -1,
  });
  res.json(posts);
};

export default handler;
