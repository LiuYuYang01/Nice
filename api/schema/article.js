const Joi = require("joi");

const title = Joi.string().min(1).max(30).required();
const author = Joi.string().min(1).max(20).required()
const cover = Joi.string().min(1).max(300)
const description = Joi.string().min(1).max(100);
const state = Joi.number();

const { id, content,multiple } = require("./schema");

// 定义ID校验
exports.idSchema = Joi.object({
  id,
});

// 定义文章校验
exports.articleSchema = Joi.object({
  title, //文章标题
  content, //文章内容
  author, //文章作者
  cover, //文章封面
  description, //文章描述
  cates: multiple, //所在分类
  tags: multiple, //所属标签
  is_public: state, //是否公开
  is_catalog: state, //是否开启目录
  is_draft: state, //是否草稿
  is_audit: state, //是否审核通过
  is_delete: state, //是否删除
});
