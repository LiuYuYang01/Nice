const Joi = require("joi");

const { id, username, password } = require("./schema");

const nickname = Joi.string().min(2).max(10);
const email = Joi.string().email();
const signature = Joi.string().max(100);

// 定义ID校验
exports.idSchema = Joi.object({
  id,
});

// 定义用户校验
exports.userSchema = Joi.object({
  username,
  password,
  nickname,
  email,
  signature,
});

// 定义用户信息校验
exports.updateUserinfoSchema = Joi.object({
  id,
  nickname,
  email,
  signature
});

// 定义重置密码校验
exports.updatePwdSchema = Joi.object({
  username,
  oldPwd: password,
  // Joi.ref("oldPwd") 表示必须和oldPwd旧密码一致
  // Joi.not(Joi.ref("oldPwd")) 表示不能与旧密码一致
  // .concat(password) 表示合并校验规则，既有Joi.not(Joi.ref("oldPwd")) 又有 password的校验规则
  newPwd: Joi.not(Joi.ref("oldPwd")).concat(password),
});