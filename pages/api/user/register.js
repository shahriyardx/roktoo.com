const crypto = require("crypto");
const { UserModel, UserSchemma } = require("../../../database/schema/User");

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.statusCode = 400;
    return res.json({ error: "Bad request" });
  }

  const { password, agree, ...userData } = req.body;
  const { value, error } = UserSchemma.validate({ ...userData, password });

  if (error) {
    return res.json({ error: error.details[0].message });
  }

  const userExists = await UserModel.findOne({ phone: userData.phone });
  if (userExists) {
    return res.json({ error: "This phone number is already registered" });
  }

  const password_hash = crypto
    .pbkdf2Sync(
      password,
      crypto.randomBytes(16).toString("hex"),
      1000,
      64,
      `sha512`
    )
    .toString(`hex`);

  try {
    await UserModel.create({ ...value, password_hash });
  } catch (err) {
    return res.json({ error: "Please check the form again" });
  }
  res.json({ success: true });
}
