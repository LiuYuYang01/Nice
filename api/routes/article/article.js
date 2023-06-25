const express = require("express");
const router = express.Router();

const {
    addController,
    delController,
    updateController,
    auditController,
    recoverController,
    forceDelController,
    getController,
    getAllController,
    batchController
} = require("../../controller/article/article");


// 新增文章
router.post("/add", addController);

// 删除文章
router.post("/del", delController);

// 修改文章
router.post("/update", updateController);

// 审核文章
router.post("/audit", auditController);

// 恢复文章
router.post("/recover", recoverController);

// 强制删除文章
router.post("/forceDel", forceDelController);

// 获取文章
router.get("/get/:id", getController);

// 获取文章列表
router.get("/getAll", getAllController);

// 批量操作
router.post("/batch", batchController);

module.exports = router;
