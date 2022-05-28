const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../../../database/schema/User");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 400;
    return res.json({ error: "Bad request" });
  }

  const { phone, password } = req.body;

  const userExists = await UserModel.findOne({ phone }).select(
    "phone admin password_hash"
  );
  if (!userExists) {
    res.statusCode = 403;
    return res.json({ error: "Invalid phone or password" });
  }
  const valid = await bcrypt.compare(password, userExists.password_hash);
  if (!valid) {
    res.statusCode = 403;
    return res.json({ error: "Invalid phone or password" });
  }

  const user = { _id: userExists._id, phone: userExists.phone };
  const accessToken = jwt.sign(user, "process.env.JWT_SECRET");

  res.json({
    accessToken,
    user,
  });
}
