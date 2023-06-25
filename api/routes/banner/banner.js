const express = require("express");
const router = express.Router();

const {
    addController,
    delController,
    updateController,
    getController,
    getAllController
} = require("../../controller/banner/banner");


// 新增轮播图
router.post("/add", addController);

// 删除轮播图
router.post("/del", delController);

// 修改轮播图
router.post("/update", updateController);

// 获取轮播图
router.get("/get/:id", getController);

// 获取轮播图列表
router.get("/getAll", getAllController);

module.exports = router;
