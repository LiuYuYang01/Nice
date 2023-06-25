const db = require("../../db");
const { commentSchema, idSchema } = require("../../schema/comment");

// 新增评论
exports.addController = (req, res) => {
  const { name, email, content, article } = req.body;
  
  const info = { name, email, content, article }

  // 数据校验
  const comment = commentSchema.validate({ name, email, content, article });
  if (comment.error) return res.info(comment.error.details[0].message);

  // 新增评论
  db.query("insert into comments set ?", info, (err, results) => {
    if (err) return res.info(err.message);

    if (results.affectedRows !== 1) return res.info("新增评论失败");

    res.send({ state: 200, message: "新增评论成功", success: true });
  });
};

// 删除评论
exports.delController = (req, res) => {
  // ID校验
  const id = idSchema.validate({ id: req.body.id });
  if (id.error) return res.info(id.error.details[0].message);

  db.query("delete from comments where id = ?", req.body.id, (err, results) => {
    if (err) return res.info(err.message);

    if (results.affectedRows !== 1) return res.info("删除评论失败");

    res.send({ state: 200, message: "删除评论成功", success: true });
  });
};

// 修改评论
exports.updateController = (req, res) => {
  const { name, email, content, article, is_audit } = req.body;

  const info = { name, email, content, article, is_audit };

  // is_audit字段校验
  if (Number(is_audit) !== 1 && Number(is_audit) !== 0) {
    return res.info("is_audit字段 仅限于0 or 1");
  }

  // ID校验
  const id = idSchema.validate({ id: req.body.id });
  if (id.error) return res.info(id.error.details[0].message);

  // 数据校验
  const comment = commentSchema.validate({ name, email, content, article });
  if (comment.error) return res.info(comment.error.details[0].message);

  // 修改评论
  db.query(
    "update comments set ? where id = ?",
    [info, req.body.id],
    (err, results) => {
      if (err) return res.info(err.message);

      if (results.affectedRows !== 1) return res.info("修改评论失败");

      res.send({ state: 200, message: "修改评论成功", success: true });
    }
  );
};

// 审核评论
exports.auditController = (req, res) => {
  const is_audit = req.body.is_audit;

  // is_audit字段校验
  if (Number(is_audit) !== 1 && Number(is_audit) !== 0) {
    return res.info("is_audit字段 仅限于0 or 1");
  }

  // ID校验
  const id = idSchema.validate({ id: req.body.id });
  if (id.error) return res.info(id.error.details[0].message);

  db.query(
    "update comments set is_audit = ? where id = ?",
    [is_audit, req.body.id],
    (err, results) => {
      if (err) return res.info(message);

      console.log(results);
      if (results.affectedRows !== 1) return res.info("审核评论失败");

      res.send({ state: 200, message: "该评论已通过审核", success: true });
    }
  );
};

// 批量删除评论
exports.batchDelController = (req, res) => {
  let ids = req.body.ids;

  db.query(`delete from comments where id in (${ids})`, (err, results) => {
    if (err) return res.info(err.message);

    if (results.affectedRows === 0) return res.info("批量删除评论失败");

    res.send({ state: 200, message: "批量删除评论成功", success: true });
  });
};

// 获取评论
exports.getController = (req, res) => {
  // ID校验
  const id = idSchema.validate({ id: req.params.id });
  if (id.error) return res.info(id.error.details[0].message);

  db.query(
    "select * from comments where id = ?",
    req.params.id,
    (err, results) => {
      if (err) return res.info(err.message);

      if (results.length !== 1) return res.info("未找到该评论");

      res.send({
        state: 200,
        message: "获取评论成功",
        data: results[0],
        success: true,
      });
    }
  );
};

// 获取评论列表
exports.getAllController = (req, res) => {
  db.query("select * from comments", (err, results) => {
    if (err) return res.info(err.message);

    res.send({
      state: 200,
      message: "获取评论列表成功",
      data: results || [],
      success: true,
    });
  });
};
