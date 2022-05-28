require("../mongodb");
const joi = require("joi");
const mongoose = require("mongoose");

const PostSchemaMongo = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    details: String,
    time: {
      type: Date,
      required: true,
    },
    fulfilled: {
      type: Boolean,
      default: false,
    },
    user_id: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const PostSchema = joi.object({
  title: joi.string().required(),
  location: joi.string().required(),
  phone: joi.string().required(),
  details: joi.string().required(),
  time: joi.date().required(),
  fulfilled: joi.boolean(),
});

const PostUpdateSchema = joi.object({
  title: joi.string().required(),
  location: joi.string().required(),
  phone: joi.string().required(),
  details: joi.string().required(),
  time: joi.date().required(),
  fulfilled: joi.boolean().required(),
});

const PostModel =
  mongoose.models.Post || mongoose.model("Post", PostSchemaMongo);

module.exports = {
  PostModel,
  PostSchema,
  PostUpdateSchema,
};
