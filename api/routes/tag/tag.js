const express = require("express");
const router = express.Router();

const {
    addController,
    delController,
    updateController,
    getController,
    getAllController
} = require("../../controller/tag/tag");


// 新增标签
router.post("/add", addController);

// 删除标签
router.post("/del", delController);

// 更新标签
router.post("/update", updateController);

// 获取标签
router.get("/get/:id", getController);

// 获取标签列表
router.get("/getAll", getAllController);

module.exports = router;
