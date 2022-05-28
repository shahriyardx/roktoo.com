import { getSession } from "next-auth/react";
import { PostModel } from "../../../database/schema/Post";

const handler = async (req, res) => {
  const { postId } = req.query;
  const post = await PostModel.findOne({ _id: postId });

  if (!post) {
    return res.json({ error: "Post not found" });
  }

  if (req.method == "GET") {
    return res.json(post);
  }

  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return res.json({ error: "User not found" });
  }

  if (session.user._id !== post.user_id && !session.user.admin) {
    res.statusCode = 403;
    return res.json({ error: "Unauthorized" });
  }

  if (req.method == "DELETE") {
    await PostModel.deleteOne({ _id: post._id });
  }

  if (req.method == "PUT") {
    if (post.fulfilled) {
      return res.json({ error: "Can't udpate a fulfilled post" });
    }
    await PostModel.updateOne(
      { _id: post._id },
      {
        $set: req.body,
      }
    );
  }
  return res.json({ success: true });
};

export default handler;
