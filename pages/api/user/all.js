import { UserModel } from "../../../database/schema/User";

const handler = async (req, res) => {
  if (req.method !== "GET") {
    res.statusCode = 400;
    return res.json({ error: "Bad request" });
  }

  const doantors = await UserModel.find({ available: true }).select(
    "phone blood address district area name"
  );

  return res.json(doantors);
};

export default handler;
