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
    admin: Boolean,
  },
  { timestamps: true }
);

const UserSchemma = joi.object({
  phone: joi
    .string()
    .pattern(/^(?:\+88|88)?(01[3-9]\d{8})$/)
    .required(),
  blood: joi.string().required(),
  name: joi.string().required(),
  password: joi.string().required(),
  district: joi.string().required(),
  area: joi.string().required(),
});

const UserUpdateSchema = joi.object({
  phone: joi
    .string()
    .pattern(/^(?:\+88|88)?(01[3-9]\d{8})$/)
    .required(),
  blood: joi.string().required(),
  name: joi.string().required(),
  district: joi.string().required(),
  area: joi.string().required(),
  available: joi.boolean().required(),
});

UserSchemaMongo.pre("save", function (next) {
  this.available = true;
  this.admin = false;
  next();
});

const UserModel =
  mongoose.models.User || mongoose.model("User", UserSchemaMongo);

module.exports = {
  UserModel,
  UserSchemma,
  UserUpdateSchema,
};
