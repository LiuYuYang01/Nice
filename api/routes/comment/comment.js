const express = require("express");
const router = express.Router();

const {
  addController,
  delController,
  updateController,
  auditController,
  batchDelController,
  getController,
  getAllController,
} = require("../../controller/comment/comment");

// 新增评论
router.post("/add", addController);

// 删除评论
router.post("/del", delController);

// 修改评论
router.post("/update", updateController);

// 审核评论
router.post("/audit", auditController);

// 批量删除评论
router.post("/batchDel", batchDelController);

// 获取评论
router.get("/get/:id", getController);

// 获取评论列表
router.get("/getAll", getAllController);

module.exports = router;
