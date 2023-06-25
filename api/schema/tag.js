const Joi = require("joi");
const { id } = require("./schema");

const title = Joi.string().required();

const mark = Joi.string().min(1).max(10).required();


// 定义ID校验
exports.idSchema = Joi.object({
    id
})

// 定义标签校验
exports.tagSchema = Joi.object({
  title,
  mark,
});