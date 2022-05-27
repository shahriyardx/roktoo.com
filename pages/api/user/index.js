const { UserModel } = require("../../../database/schema/User");

export default async function handler(req, res) {
  const users = await UserModel.find();
  await res.json(users);
}
