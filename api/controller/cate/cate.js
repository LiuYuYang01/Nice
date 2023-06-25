const db = require("../../db");
const { cateSchema, idSchema } = require("../../schema/cate");

// 获取全部分类
exports.getAllController = (req, res) => {
  db.query("select * from cates", (err, results) => {
    if (err) return res.info(err.message);

    res.send({
      state: 200,
      message: "获取分类列表成功",
      data: results || [],
      success: true,
    });
  });
};

// 获取分类
exports.getController = (req, res) => {
  // 校验 id
  const id = idSchema.validate({ id: req.params.id });
  if (id.error) return res.info(id.error.details[0].message);

  db.query(
    "select * from cates where id = ?",
    req.params.id,
    (err, results) => {
      if (err) return res.info(err.message);

      if (results.length !== 1) return res.info("未找到该分类");

      res.send({
        state: 200,
        message: "获取分类成功",
        data: results[0],
        success: true,
      });
    }
  );
};

// 新增分类
exports.addController = (req, res) => {
  const { title, mark, pid, description } = req.body;

  // 数据校验
  const cate = cateSchema.validate({ title, mark, pid, description });
  if (cate.error) return res.info(cate.error.details[0].message);

  // 新增之前先判断准备新增的分类 或 标识是否存在
  db.query(
    "select * from cates where title = ? or mark = ?",
    [title, mark],
    (err, results) => {
      if (err) return res.info(err.message);

      //   判断是否存在
      if (results.length === 2) {
        return res.info("分类名称或标识已存在，请更换后重试");
      } else if (results.length === 1 && results[0].title === title) {
        return res.info("分类名称已存在，请更换后重试");
      } else if (results.length === 1 && results[0].mark === mark) {
        return res.info("分类标识已存在，请更换后重试");
      }

      //   新增分类
      db.query("insert into cates set ?", req.body, (err, results) => {
        if (err) return res.info(err.message);

        if (results.affectedRows !== 1) return res.info("分类新增失败");

        res.send({ state: 200, message: "新增分类成功", success: true });
      });
    }
  );
};

// 删除分类
exports.delController = (req, res) => {
  // 数据校验
  const id = idSchema.validate({ id: req.body.id });
  if (id.error) return res.info(id.error.details[0].message);

  db.query("delete from cates where id = ?", req.body.id, (err, results) => {
    if (err) return res.info(err.message);

    if (results.affectedRows !== 1) return res.info("删除分类失败");

    res.send({ state: 200, message: "删除分类成功", success: true });
  });
};

// 修改分类
exports.updateController = (req, res) => {
  const { title, mark, pid, description } = req.body;

  // 数据校验
  const id = idSchema.validate({ id: req.body.id });
  if (id.error) return res.info(id.error.details[0].message);

  // 数据校验
  const cate = cateSchema.validate({ title, mark, pid, description });
  if (cate.error) return res.info(cate.error.details[0].message);

  // 排除自己，查询其他分类名称 标识有没有与自己重复的
  db.query(
    "select * from cates where id != ? and (title = ? or mark = ?)",
    [req.body.id, title, mark],
    (err, results) => {
      if (err) return res.info(err.message);

      // 修改之前先判断分类名称或标识是否存在
      if (results.length === 2) {
        return res.info("分类名称或标识已存在，请更换后重试");
      } else if (results.length === 1 && results[0].title === title) {
        return res.info("分类名称已存在，请更换后重试");
      } else if (results.length === 1 && results[0].mark === mark) {
        return res.info("分类标识已存在，请更换后重试");
      }

      // 修改分类
      db.query(
        "update cates set ? where id = ?",
        [req.body, req.body.id],
        (err, results) => {
          if (err) return res.info(err.message);

          if (results.affectedRows !== 1) return res.info("修改分类失败");

          res.send({ state: 200, message: "修改分类成功", success: true });
        }
      );
    }
  );
};
