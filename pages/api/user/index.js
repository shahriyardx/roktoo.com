import { getSession } from "next-auth/react";
import { UserModel } from "../../../database/schema/User";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    res.statusCode = 400;
    return res.json({ error: "Bad request" });
  }
  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return res.json({ error: "User not found" });
  }

  const user = await UserModel.findOne({ _id: session.user._id }).select(
    "phone blood address district area available name admin"
  );

  if (!user) {
    return res.json({ error: "User not found" });
  }

  return res.json(user);
};

export default handler;
