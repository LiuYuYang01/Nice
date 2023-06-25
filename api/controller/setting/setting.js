const db = require("../../db");

// 修改系统配置
exports.updateSystemController = (req, res) => {
  console.log(req.body,666);
  db.query(
    "update setting set config = ? where id = 1",
    JSON.stringify(req.body),
    (err, results) => {
      if (err) return res.info(err.message);

      if (results.affectedRows !== 1) return res.info("修改系统配置失败");

      res.send({
        state: 200,
        message: "修改系统配置成功",
        success: true,
      });
    }
  );
};

// 修改网站配置
exports.updateWebController = (req, res) => {
  db.query(
    "update setting set web = ? where id = 1",
    JSON.stringify(req.body),
    (err, results) => {
      if (err) return res.info(err.message);

      if (results.affectedRows !== 1) return res.info("修改网站配置失败");

      res.send({
        state: 200,
        message: "修改网站配置成功",
        success: true,
      });
    }
  );
};

// 获取配置信息
exports.getController = (req, res) => {
  db.query("select * from setting where id = 1", (err, results) => {
    if (err) return res.info(err.message);

    res.send({
      state: 200,
      message: "获取配置信息",
      data: results[0],
      success: true,
    });
  });
};