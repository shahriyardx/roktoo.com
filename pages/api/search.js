import { UserModel } from "../../database/schema/User";

const handler = async (req, res) => {
  const { blood, district, area } = req.query;
  const filter = { blood, district, available: true };
  if (area) {
    filter["area"] = area;
  }

  const dontators = await UserModel.find(filter).select("name address phone");
  res.json(dontators);
};

export default handler;
