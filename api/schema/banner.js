const Joi = require("joi");

const title = Joi.string().min(1).max(30).required();
const deputyTitle = Joi.string().min(1).max(100).required();

const { id, image } = require("./schema");

// 定义ID校验
exports.idSchema = Joi.object({
  id,
});

// 定义轮播图校验
exports.bannerSchema = Joi.object({
  title,
  deputyTitle,
  image
});
