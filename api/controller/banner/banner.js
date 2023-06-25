const db = require("../../db");
const { bannerSchema, idSchema } = require("../../schema/banner");

// 新增轮播图
exports.addController = (req, res) => {
  const { title, deputyTitle, image } = req.body;
  
  const info = { title, deputyTitle, image };

  // 数据校验
  const banner = bannerSchema.validate({ title, deputyTitle, image });
  if (banner.error) return res.info(banner.error.details[0].message);

  // 新增轮播图
  db.query("insert into banners set ?", info, (err, results) => {
    if (err) return res.info(err.message);

    if (results.affectedRows !== 1) return res.info("新增轮播图失败");

    res.send({ state: 200, message: "新增轮播图成功", success: true });
  });
};

// 删除轮播图
exports.delController = (req, res) => {
  // ID校验
  const id = idSchema.validate({ id: req.body.id });
  if (id.error) return res.info(id.error.details[0].message);

  db.query("delete from banners where id = ?", req.body.id, (err, results) => {
    if (err) return res.info(err.message);

    if (results.affectedRows !== 1) return res.info("删除轮播图失败");

    res.send({ state: 200, message: "删除轮播图成功", success: true });
  });
};

// 修改轮播图
exports.updateController = (req, res) => {
  const { title, deputyTitle, image } = req.body;

  const info = { title, deputyTitle, image };

  // ID校验
  const id = idSchema.validate({ id: req.body.id });
  if (id.error) return res.info(id.error.details[0].message);

  // 数据校验
  const banner = bannerSchema.validate({ title, deputyTitle, image });
  if (banner.error) return res.info(banner.error.details[0].message);

  // 修改轮播图
  db.query(
    "update banners set ? where id = ?",
    [info, req.body.id],
    (err, results) => {
      if (err) return res.info(err.message);

      if (results.affectedRows !== 1) return res.info("修改轮播图失败");

      res.send({ state: 200, message: "修改轮播图成功", success: true });
    }
  );
};

// 获取轮播图
exports.getController = (req, res) => {
  // ID校验
  const id = idSchema.validate({ id: req.params.id });
  if (id.error) return res.info(id.error.details[0].message);

  db.query(
    "select * from banners where id = ?",
    req.params.id,
    (err, results) => {
      if (err) return res.info(err.message);

      if (results.length !== 1) return res.info("未找到该轮播图");

      res.send({
        state: 200,
        message: "获取轮播图成功",
        data: results[0],
        success: true,
      });
    }
  );
};

// 获取轮播图列表
exports.getAllController = (req, res) => {
  db.query("select * from banners", (err, results) => {
    if (err) return res.info(err.message);

    res.send({
      state: 200,
      message: "获取轮播图列表成功",
      data: results || [],
      success: true,
    });
  });
};
