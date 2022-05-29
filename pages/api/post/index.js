import { PostModel } from "../../../database/schema/Post";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    res.statusCode = 400;
    return res.json({ error: "Bad request" });
  }

  const page = req.query.page ? parseInt(req.query.page) : 0;
  const filter = {
    fulfilled: false,
    time: { $gte: new Date().setHours(0, 0, 0, 0) },
  };
  const postCount = await PostModel.countDocuments(filter);
  const posts = await PostModel.find(filter)
    .sort({
      createdAt: -1,
    })
    .skip(page * 20)
    .limit(20);
  res.json({ posts, postCount });
};

export default handler;
