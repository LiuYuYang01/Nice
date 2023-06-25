const express = require("express");
const router = express.Router();

const {
  updateSystemController,
  updateWebController,
  getController,
} = require("../../controller/setting/setting");

// 修改系统配置
router.post("/system", updateSystemController);

// 修改网站配置
router.post("/web", updateWebController);

// 获取配置信息
router.get("/config", getController);

module.exports = router;
