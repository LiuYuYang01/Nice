const Joi = require("joi");

const icon = Joi.string().max(50)

const {
  id,
  title,
  mark,
  pid,
  description
} = require('./schema')


// 定义ID校验
exports.idSchema = Joi.object({
  id
})

// 定义用户校验
exports.cateSchema = Joi.object({
  title,
  mark,
  pid,
  icon,
  description
});
