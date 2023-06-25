const express = require("express");
const router = express.Router();

const {
    addController,
    delController,
    updateController,
    getController,
    getAllController
} = require("../../controller/link/link");


// 新增友联
router.post("/add", addController);

// 删除友联
router.post("/del", delController);

// 修改友联
router.post("/update", updateController);

// 获取友联
router.get("/get/:id", getController);

// 获取友联列表
router.get("/getAll", getAllController);

module.exports = router;