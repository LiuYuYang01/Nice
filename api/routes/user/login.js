const express = require("express");
const router = express.Router();

const {
  registerController,
  loginController
} = require("../../controller/user/login");

// 用户注册
router.post("/register", registerController);

// 用户登录
router.post("/login", loginController);

module.exports = router;
