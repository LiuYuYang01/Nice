const Joi = require("joi");

const { id, title, email, content100, article, state } = require("./schema");

exports.idSchema = Joi.object({
  id,
});

// 定义评论校验
exports.commentSchema = Joi.object({
  name: title,
  email,
  content: content100,
  article,
  is_audit: state,
});
