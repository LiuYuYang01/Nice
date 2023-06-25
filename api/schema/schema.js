const Joi = require("joi");

// 规定id为数字整数类型 不能低于一位数并且不能为空
const id = Joi.number().integer().min(1).required();

// 规定用户名为字符串类型 由字母 数字组合 不能低于6位 大于16位数 并且不能为空
const username = Joi.string().alphanum().min(6).max(16).required();

// 规定密码数字字母组合 6 ~ 30位数 并且不能为空
const password = Joi.string()
  .pattern(new RegExp("^[a-zA-Z0-9]{6,30}$"))
  .required();

// 规定昵称为字符串类型 并且不能为空
const nickname = Joi.string().required();

// 规定邮箱为字符串类型 并且不能为空
const email = Joi.string().email().required();

// 规定标题字符串类型 由字母 数字组合 不能低于1位 大于10位数 并且不能为空
const title = Joi.string().min(1).max(10).required();

// 标识
const mark = Joi.string().min(1).max(10).required();

// 标识
const pid = Joi.number().integer().required();

// 描述
const description = Joi.string().min(1).max(100).required();

// 链接
const url = Joi.string().required();

// 图片
const icon = Joi.string().required();

// 名称
const article = Joi.string().min(1).max(50).required();

// 内容 限制1~100个字符
const content100 = Joi.string().min(1).max(100).required();

// 不限制字数
const content = Joi.string().min(1).required();

// 状态
const state = Joi.number().min(1);

// 图片
const image = Joi.string().max(300).required();

// 作者
const author = Joi.string().min(1).max(10).required() 

// 以数组形式传多个值
const multiple = Joi.string().required();

module.exports = {
  id,
  username,
  password,
  nickname,
  email,
  title,
  mark,
  pid,
  description,
  url,
  icon,
  article,
  content,
  content100,
  state,
  image,
  author,
  multiple
};
