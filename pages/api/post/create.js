import { getSession } from "next-auth/react";
import { PostModel, PostSchema } from "../../../database/schema/Post";

const handler = async (req, res) => {
  if (req.method !== "POST") {
    res.statusCode = 400;
    return res.json({ error: "Bad request" });
  }

  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return res.json({ error: "User not found" });
  }

  const { value, error } = PostSchema.validate(req.body);
  if (error) {
    return res.json({ error: error.details[0].message });
  }

  await PostModel.create({ ...value, user_id: session.user._id });
  res.json({ success: true });
};

export default handler;
