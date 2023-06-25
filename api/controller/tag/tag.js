const db = require("../../db");
const { tagSchema, idSchema } = require("../../schema/tag");

// 新增标签
exports.addController = (req, res) => {
  const { title, mark } = req.body;

  // 数据校验
  const tag = tagSchema.validate({ title, mark });
  if (tag.error) return res.info(tag.error.details[0].message);

  // 新增之前先判断准备新增的标签名称 或 标识是否存在
  db.query(
    "select * from tags where title = ? or mark = ?",
    [title, mark],
    (err, results) => {
      if (err) return res.info(err.message);

      // 判断是否存在
      if (results.length === 2) {
        return res.info("标签名称或标识已存在，请更换后重试");
      } else if (results.length === 1 && results[0].title === title) {
        return res.info("标签名称已存在，请更换后重试");
      } else if (results.length === 1 && results[0].mark === mark) {
        return res.info("标签标识已存在，请更换后重试");
      }

      // 新增标签
      db.query("insert into tags set ?", req.body, (err, results) => {
        if (err) return res.info(err.message);

        if (results.affectedRows !== 1) return res.info("新增标签失败");

        res.send({ state: 200, message: "新增标签成功", success: true });
      });
    }
  );
};

// 删除标签
exports.delController = (req, res) => {
  // 数据校验
  const id = idSchema.validate({ id: req.body.id });
  if (id.error) return res.info(id.error.details[0].message);

  db.query("delete from tags where id = ?", req.body.id, (err, results) => {
    if (err) return res.info(err.message);

    if (results.affectedRows !== 1) return res.info("删除标签失败");

    res.send({ state: 200, message: "删除标签成功", success: true });
  });
};

// 修改标签
exports.updateController = (req, res) => {
  const { title, mark } = req.body;

  // 数据校验
  const id = idSchema.validate({ id: req.body.id });
  if (id.error) return res.info(id.error.details[0].message);

  // 数据校验
  const tag = tagSchema.validate({ title, mark });
  if (tag.error) return res.info(tag.error.details[0].message);

  // 排除自己，查询其他标签名称 标识有没有与自己重复的
  db.query(
    "select * from tags where id != ? and (title = ? or mark = ?)",
    [req.body.id, title, mark],
    (err, results) => {
      if (err) return res.info(err.message);

      // 修改之前先判断标签名称或标识是否存在
      if (results.length === 2) {
        return res.info("标签名称或标识已存在，请更换后重试");
      } else if (results.length === 1 && results[0].title === title) {
        return res.info("标签名称已存在，请更换后重试");
      } else if (results.length === 1 && results[0].mark === mark) {
        return res.info("标签标识已存在，请更换后重试");
      }

      // 修改标签
      db.query(
        "update tags set ? where id = ?",
        [req.body, req.body.id],
        (err, results) => {
          if (err) return res.info(err.message);

          if (results.affectedRows !== 1) return res.info("修改标签失败");

          res.send({ state: 200, message: "修改标签成功", success: true });
        }
      );
    }
  );
};

// 获取标签
exports.getController = (req, res) => {
  // 校验 id
  const id = idSchema.validate({ id: req.params.id });
  if (id.error) return res.info(id.error.details[0].message);

  db.query("select * from tags where id = ?", req.params.id, (err, results) => {
    if (err) return res.info(err.message);

    if (results.length !== 1) return res.info("未找到该标签");

    res.send({
      state: 200,
      message: "获取标签成功",
      data: results[0],
      success: true,
    });
  });
};

// 获取标签列表
exports.getAllController = (req, res) => {
  db.query("select * from tags", (err, results) => {
    if (err) return res.info(err.message);

    res.send({
      state: 200,
      message: "获取标签列表成功",
      data: results || [],
      success: true,
    });
  });
};
