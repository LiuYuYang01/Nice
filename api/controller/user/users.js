const db = require("../../db");

// 数据加密
const bcrypt = require("bcryptjs");

// 数据校验
const {
  idSchema,
  userSchema,
  updateUserinfoSchema,
  updatePwdSchema,
  updateAvatarSchema,
} = require("../../schema/user");

// 获取用户列表
exports.getController = (req, res, next) => {
  db.query("select * from users", (err, results) => {
    if (err) return res.info(err.message);

    res.send({
      status: 200,
      message: "获取用户列表成功",
      data: results || [],
      success: true,
    });
  });
};

// 获取用户
exports.getUserController = (req, res, next) => {
  // 校验 id
  const id = idSchema.validate({ id: req.params.id });
  if (id.error) return res.info(id.error.details[0].message);

  db.query(
    "select * from users where id = ?",
    req.params.id,
    (err, results) => {
      if (err) return res.info(err.message);

      if (results.length !== 1) return res.info("未找到该用户");

      res.send({
        status: 200,
        message: "获取用户成功",
        data: results[0],
        success: true,
      });
    }
  );
};

// 添加用户
exports.addController = (req, res, next) => {
  let { username, password, nickname, email, signature } = req.body;

  // 数据校验
  const userInfo = userSchema.validate({
    username,
    password,
    nickname,
    email,
    signature,
  });
  if (userInfo.error) return res.info(userInfo.error.details[0].message);

  // 添加之前先判断准备添加的用户是否存在
  db.query(
    "select * from users where username = ?",
    username,
    (err, results) => {
      if (err) return res.info(err.message);

      if (results.length !== 0) return res.info("用户已存在，请更换后重试");

      password = bcrypt.hashSync(password, 10);

      db.query(
        "insert into users set ?",
        { username, password, nickname, email },
        (err, results) => {
          if (err) return res.info(err.message);

          if (results.affectedRows !== 1) return res.info("新增用户失败");

          res.send({ status: 200, message: "新增用户成功", success: true });
        }
      );
    }
  );
};

// 删除用户
exports.delController = (req, res, next) => {
  // 数据校验
  const id = idSchema.validate({ id: req.body.id });
  if (id.error) return res.info(id.error.details[0].message);

  db.query("delete from users where id = ?", req.body.id, (err, results) => {
    if (err) return res.info(err.message);

    if (results.affectedRows !== 1) return res.info("删除用户失败");

    res.send({ status: 200, message: "用户删除成功", success: true });
  });
};

// 修改用户
exports.updateController = (req, res, next) => {
  let { username, password, nickname, email, signature } = req.body;

  // 数据校验
  const id = idSchema.validate({ id: req.body.id });
  if (id.error) return res.info(id.error.details[0].message);

  // 数据校验
  const userInfo = userSchema.validate({
    username,
    password,
    nickname,
    email,
    signature,
  });

  if (userInfo.error) return res.info(userInfo.error.details[0].message);

  // 修改密码后重新加密一下
  password = bcrypt.hashSync(password, 10);
  req.body.password = password;

  // 修改前先判断准备修改的用户是否存在
  // 把自己排除，判断有没有跟准备修改的用户名重复的
  db.query(
    "select * from users where id != ? and username = ?",
    [req.body.id, username],
    (err, results) => {
      if (err) return res.info(err.message);

      if (results.length !== 0) return res.info("用户已存在，请更换后重试");

      password = bcrypt.hashSync(password, 10);

      db.query(
        "update users set ? where id = ?",
        [req.body, req.body.id],
        (err, results) => {
          if (err) return res.info(err.message);

          if (results.affectedRows !== 1) return res.info("修改用户失败");

          res.send({ status: 200, message: "修改用户成功", success: true });
        }
      );
    }
  );
};

// 获取用户信息
exports.getUserinfoController = (req, res, next) => {
  let id = req.body.id;

  db.query(
    "select id, username, nickname, email, user_pic from users where id = ?",
    id,
    (err, results) => {
      // 执行 SQL失败
      if (err) return res.info(err.message);

      if (results.length !== 1) return res.info("获取用户信息失败");

      res.send({
        state: 200,
        message: "获取数据成功",
        data: results[0],
        success: true,
      });
    }
  );
};

// 修改用户信息
exports.updateInfoController = (req, res, next) => {
  let { id, avatar, nickname, email, signature } = req.body;
  const userInfo = updateUserinfoSchema.validate({ id, nickname, email });

  // 如果userInfo.error值为true则校验失败;
  if (userInfo.error) return res.info(userInfo.error.details[0].message);

  db.query(
    "update users set ? where id = ?",
    [{ avatar, nickname, email, signature }, id],
    (err, result) => {
      if (err) return res.info(err.message);

      if (result.affectedRows !== 1) return res.info("修改用户信息失败");

      res.send({
        status: 200,
        message: "修改用户信息成功",
        data: req.body,
        success: true,
      });
    }
  );
};

// 重置用户密码
exports.safeController = (req, res, next) => {
  let { id, username, oldPwd, newPwd } = req.body;
  const updatepwd = updatePwdSchema.validate({ username, oldPwd, newPwd });

  // 校验失败
  if (updatepwd.error) return res.info(updatepwd.error.details[0].message);

  db.query("select * from users where id = ?", id, (err, results) => {
    if (err) return res.info(err.message);

    console.log(results, 777);

    if (results.length === 0) return res.info("找不到该用户！");

    // 验证旧密码是否输入正确
    let compareresults = bcrypt.compareSync(oldPwd, results[0].password);

    // 新密码加密
    newPwd = bcrypt.hashSync(newPwd, 10);

    if (!compareresults) return res.info("旧密码错误，请重新输入");

    db.query(
      "select * from users where id != ? and username = ?",
      [req.body.id, username],
      (err, results) => {
        if (err) return res.info(err.message);

        if (results.length !== 0) return res.info("用户已存在，请更换后重试");

        db.query(
          "update users set username = ?, password = ? where id = ?",
          [username, newPwd, id],
          (err, results) => {
            if (err) return res.info(err.message);

            if (results.affectedRows !== 1) return res.info("修改安全信息失败");

            res.send({
              status: 200,
              message: "修改安全信息成功",
              success: true,
            });
          }
        );
      }
    );
  });
};
