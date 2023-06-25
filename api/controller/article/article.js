const db = require("../../db");
const { articleSchema, idSchema } = require("../../schema/article");

// 新增文章
exports.addController = (req, res) => {
  const {
    title,
    content,
    author,
    cover,
    description,
    cates,
    tags,
    is_public,
    is_catalog,
    is_draft,
    is_audit,
    is_delete,
    date,
  } = req.body;

  const info = {
    title,
    content,
    author,
    cover,
    description,
    cates,
    tags,
    is_public,
    is_catalog,
    is_draft,
    is_audit,
    is_delete,
    date,
  };

  // 数据校验
  const article = articleSchema.validate({
    title,
    content,
    author,
    // cover,
    // description,
    cates,
    tags,
    is_public,
    is_catalog,
    is_draft,
    is_audit,
    is_delete,
  });
  if (article.error) return res.info(article.error.details[0].message);

  // 新增文章
  db.query("insert into articles set ?", info, (err, results) => {
    if (err) return res.info(err.message);

    if (results.affectedRows !== 1) return res.info("新增文章失败");

    res.send({ state: 200, message: "新增文章成功", success: true });
  });
};

// 删除文章
exports.delController = (req, res) => {
  // ID校验
  const id = idSchema.validate({ id: req.body.id });
  if (id.error) return res.info(id.error.details[0].message);

  db.query(
    "update articles set is_delete = 1 where id = ?",
    req.body.id,
    (err, results) => {
      if (err) return res.info(err.message);

      if (results.affectedRows !== 1) return res.info("删除文章失败");

      res.send({ state: 200, message: "删除文章成功", success: true });
    }
  );
};

// 修改文章
exports.updateController = (req, res) => {
  const {
    title,
    content,
    author,
    cover,
    description,
    cates,
    tags,
    is_public,
    is_catalog,
    is_draft,
    is_audit,
    is_delete,
  } = req.body;

  const info = {
    title,
    content,
    author,
    cover,
    description,
    cates,
    tags,
    is_public,
    is_catalog,
    is_draft,
    is_audit,
    is_delete,
  };

  // ID校验
  const id = idSchema.validate({ id: req.body.id });
  if (id.error) return res.info(id.error.details[0].message);

  // 数据校验
  const article = articleSchema.validate({
    title,
    content,
    author,
    // cover,
    // description,
    cates,
    tags,
    is_public,
    is_catalog,
    is_draft,
    is_audit,
    is_delete,
  });
  if (article.error) return res.info(article.error.details[0].message);

  // 修改文章
  db.query(
    "update articles set ? where id = ?",
    [info, req.body.id],
    (err, results) => {
      if (err) return res.info(err.message);

      if (results.affectedRows !== 1) return res.info("修改文章失败");

      res.send({ state: 200, message: "修改文章成功", success: true });
    }
  );
};

// 审核文章
exports.auditController = (req, res) => {
  // ID校验
  const id = idSchema.validate({ id: req.body.id });
  if (id.error) return res.info(id.error.details[0].message);

  // 修改文章
  db.query(
    "update articles set is_audit = 1 where id = ?",
    req.body.id,
    (err, results) => {
      if (err) return res.info(err.message);

      if (results.affectedRows !== 1) return res.info("审核文章失败");

      res.send({ state: 200, message: "审核文章成功", success: true });
    }
  );
  console.log(4444);
};

// 恢复文章
exports.recoverController = (req, res) => {
  // ID校验
  const id = idSchema.validate({ id: req.body.id });
  if (id.error) return res.info(id.error.details[0].message);

  // 修改文章
  db.query(
    "update articles set is_delete = 0 where id = ?",
    req.body.id,
    (err, results) => {
      if (err) return res.info(err.message);

      if (results.affectedRows !== 1) return res.info("恢复文章失败");

      res.send({ state: 200, message: "恢复文章成功", success: true });
    }
  );
};

// 强制删除文章
exports.forceDelController = (req, res) => {
  // ID校验
  const id = idSchema.validate({ id: req.body.id });
  if (id.error) return res.info(id.error.details[0].message);

  // 强制删除文章
  db.query("delete from articles where id = ?", req.body.id, (err, results) => {
    if (err) return res.info(err.message);

    if (results.affectedRows !== 1) return res.info("删除文章失败");

    res.send({ state: 200, message: "删除文章成功", success: true });
  });
};

// 获取文章
exports.getController = (req, res) => {
  // ID校验
  const id = idSchema.validate({ id: req.params.id });
  if (id.error) return res.info(id.error.details[0].message);

  db.query(
    "select * from articles where id = ?",
    req.params.id,
    (err, results) => {
      if (err) return res.info(err.message);

      if (results.length !== 1) return res.info("未找到该文章");

      res.send({
        state: 200,
        message: "获取文章成功",
        data: results[0],
        success: true,
      });
    }
  );
};

// 获取文章列表
exports.getAllController = (req, res) => {
  db.query("select * from articles", (err, results) => {
    if (err) return res.info(err.message);

    res.send({
      state: 200,
      message: "获取文章列表成功",
      data: results || [],
      success: true,
    });
  });
};

// 批量操作
exports.batchController = (req, res) => {
  // condition 条件
  // failurePrompt 失败提示
  // message 服务器响应的内容
  let { type, ids, failurePrompt, message } = req.body;

  let sql = "";

  if (type === "audit") {
    // 批量审核文章
    sql = `update articles set is_audit = 1 where id in (${ids})`;
  } else if (type === "publish") {
    // 批量发布文章
    sql = `update articles set is_draft = 0 where id in (${ids})`;
  } else if (type === "recover") {
    // 批量恢复文章
    sql = `update articles set is_delete = 0 where id in (${ids})`;
  } else if (type === "delete") {
    // 批量删除文章
    sql = `update articles set is_delete = 1 where id in (${ids})`;
  } else if (type === "forceDel") {
    // 批量强制删除文章
    sql = `delete from articles where id in (${ids})`;
  }

  db.query(sql, (err, results) => {
    if (err) return res.info(err.message);

    if (results.affectedRows && results.affectedRows === 0)
      return res.info(failurePrompt || "操作失败");

    if (results.length === 0) return res.info("未找到该数据");

    res.send({
      state: 200,
      message: message || "成功",
      data: results || [],
      success: true,
    });
  });
};
