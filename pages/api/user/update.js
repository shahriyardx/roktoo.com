import { getSession } from "next-auth/react";

const {
  UserModel,
  UserUpdateSchema,
} = require("../../../database/schema/User");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 400;
    return res.json({ error: "Bad request" });
  }

  const session = await getSession({ req });
  if (!session) {
    res.statusCode = 403;
    return res.json({ error: "User not found" });
  }

  const { _id, admin, ...userData } = req.body;
  const { value, error } = UserUpdateSchema.validate({ ...userData });

  if (error) {
    return res.json({ error: error.details[0].message });
  }

  const user = await UserModel.findOne({ _id: session.user._id });

  if (!user) {
    return res.json({
      error: "User not found. Please log out and login again.",
    });
  }

  if (user.phone !== userData.phone) {
    const phoneUser = await UserModel.findOne({ phone: userData.phone });

    if (phoneUser) {
      return res.json({ error: "There is another account with this phone." });
    }
  }

  await UserModel.updateOne(
    { _id: session.user._id },
    {
      $set: value,
    }
  );

  return res.json({ success: true });
}
