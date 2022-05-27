require("../mongodb");
const joi = require("joi");
const mongoose = require("mongoose");

const UserSchemaMongo = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
    },
    blood: {
      type: String,
      required: true,
    },
    address: String,
    district: {
      type: String,
      required: true,
    },
    area: {
      type: String,
      required: true,
    },
    available: Boolean,
    password_hash: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const UserSchemma = joi.object({
  phone: joi
    .string()
    .pattern(/^(?:\+88|88)?(01[3-9]\d{8})$/)
    .required(),
  blood: joi.string().required(),
  address: joi.string(),
  name: joi.string().required(),
  password: joi.string().required(),
  district: joi.string().required(),
  area: joi.string().required(),
});

UserSchemaMongo.pre("save", function (next) {
  this.available = true;
  next();
});

const UserModel =
  mongoose.models.User || mongoose.model("User", UserSchemaMongo);

module.exports = {
  UserModel,
  UserSchemma,
};
