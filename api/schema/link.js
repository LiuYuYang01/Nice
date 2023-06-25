const Joi = require("joi");

const { id, title, url } = require("./schema");

const icon = Joi.string()
const mark = Joi.string().min(1).max(10)
const email = Joi.string().email()
const description = Joi.string().min(1).max(100)

exports.idSchema = Joi.object({
  id,
});

// 定义友联校验
exports.linkSchema = Joi.object({
  title,
  url,
  email,
  icon,
  mark,
  description,
});
