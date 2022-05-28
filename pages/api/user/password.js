const bcrypt = require("bcrypt");
const { UserModel } = require("../../../database/schema/User");
import { getSession } from "next-auth/react";

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

  const user = await UserModel.findOne({ _id: session.user._id }).select(
    "password_hash"
  );

  if (!user) {
    return res.json({
      error: "User not found. Please log out and login again.",
    });
  }

  const body = req.body;
  console.log(body);
  const valid = await bcrypt.compare(body.old_password, user.password_hash);

  if (!valid) {
    return res.json({ error: "Old password is invalid" });
  }

  const salt = await bcrypt.genSalt();
  const password_hash = await bcrypt.hash(body.new_password, salt);

  await UserModel.updateOne(
    { _id: session.user._id },
    {
      $set: {
        password_hash,
      },
    }
  );

  res.json({ success: true });
};

export default handler;
