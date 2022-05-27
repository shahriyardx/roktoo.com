const bcrypt = require("bcrypt");
const { UserModel } = require("../../../database/schema/User");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 400;
    return res.json({ error: "Bad request" });
  }

  const { phone, password } = req.body;

  const userExists = await UserModel.findOne({ phone }).select(
    "phone password_hash"
  );
  if (!userExists) {
    return res.json({ error: "Invalid phone or password" });
  }
  const valid = await bcrypt.compare(password, userExists.password_hash);
  if (!valid) {
    return res.json({ error: "Invalid phone or password" });
  }

  res.json({ _id: userExists._id, phone: userExists.phone });
}
