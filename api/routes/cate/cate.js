const express = require("express");
const router = express.Router();

const {
  addController,
  delController,
  updateController,
  getController,
  getAllController,
} = require("../../controller/cate/cate");

// 新增分类
router.post("/add", addController);

// 删除分类
router.post("/del", delController);

// 修改分类
router.post("/update", updateController);

// 获取分类
router.get("/get/:id", getController);

// 获取分类列表
router.get("/getAll", getAllController);

module.exports = router;
