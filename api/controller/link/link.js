const db = require("../../db");
const { linkSchema, idSchema } = require("../../schema/link");

// 新增友联
exports.addController = (req, res) => {
  const { title, url } = req.body;

  // 数据校验
  const link = linkSchema.validate({ title, url });
  if (link.error) return res.info(link.error.details[0].message);

  //   新增友联
  db.query("insert into links set ?", req.body, (err, results) => {
    if (err) return res.info(err.message);

    if (results.affectedRows !== 1) return res.info("新增友联失败");

    res.send({ state: 200, message: "新增友联成功", success: true });
  });
};

// 删除友联
exports.delController = (req, res) => {
  // ID校验
  const id = idSchema.validate({ id: req.body.id });
  if (id.error) return res.info(id.error.details[0].message);

  db.query("delete from links where id = ?", req.body.id, (err, results) => {
    if (err) return res.info(err.message);

    if (results.affectedRows !== 1) return res.info("删除友联失败");

    res.send({ state: 200, message: "删除友联成功", success: true });
  });
};

// 修改友联
exports.updateController = (req, res) => {
  const { title, url } = req.body;

  // ID校验
  const id = idSchema.validate({ id: req.body.id });
  if (id.error) return res.info(id.error.details[0].message);

  // 数据校验
  const link = linkSchema.validate({ title, url });
  if (link.error) return res.info(link.error.details[0].message);

  // 修改友联
  db.query(
    "update links set ? where id = ?",
    [req.body, req.body.id],
    (err, results) => {
      if (err) return res.info(err.message);

      if (results.affectedRows !== 1) return res.info("修改友联失败");

      res.send({ state: 200, message: "修改友联成功", success: true });
    }
  );
};

// 获取友联
exports.getController = (req, res) => {
  // ID校验
  const id = idSchema.validate({ id: req.params.id });
  if (id.error) return res.info(id.error.details[0].message);

  db.query("select * from links where id = ?", req.params.id, (err, results) => {
    if (err) return res.info(err.message);

    if (results.length !== 1) return res.info("未找到该友联");

    res.send({
      state: 200,
      message: "获取友联成功",
      data: results[0],
      success: true,
    });
  });
};

// 获取友联列表
exports.getAllController = (req, res) => {
  db.query("select * from links", (err, results) => {
    if (err) return res.info(err.message);

    res.send({
      state: 200,
      message: "获取友联列表成功",
      data: results || [],
      success: true,
    });
  });
};
