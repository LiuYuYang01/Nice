const express = require("express");
const router = express.Router();

const {
  getController,
  getUserController,
  addController,
  delController,
  updateController,
  getUserinfoController,
  updateInfoController,
  safeController,
} = require("../../controller/user/users");

// 新增用户
router.post("/add", addController);

// 删除用户
router.post("/del", delController);

// 修改用户
router.post("/update", updateController);

// 获取用户
router.get("/get/:id", getUserController);

// 获取用户列表
router.get("/getAll", getController);

// 获取用户信息
router.get("/info", getUserinfoController);

// 修改用户信息
router.post("/updateInfo", updateInfoController);

// 重置用户密码
router.post("/safe", safeController);

module.exports = router;
