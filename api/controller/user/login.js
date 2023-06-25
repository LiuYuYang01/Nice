const db = require("../../db/index");
const jwt = require("jsonwebtoken");
const { secretKey } = require("../../config/index");

// 数据加密
const bcrypt = require("bcryptjs");
// 数据校验
const { userSchema } = require("../../schema/user");

// 用户注册
exports.registerController = (req, res, next) => {
  let { username, password, nickname, email } = req.body;

  // 校验
  const user = userSchema.validate({ username, password });

  // 如果user有error证明检验失败，反之校验成功
  if (user.error) {
    // 返回校验失败的结果
    return res.info(user.error.details[0].message);
  }

  // 查询是否已注册
  db.query(
    "select * from users where username = ?",
    [username],
    (err, results) => {
      // 执行 SQL 语句失败
      // if (err) return res.send({ status: 0, message: err.message });
      if (err) return res.info(err.message);

      // 只要能查到数据就证明用户已存在
      if (results.length != 0) {
        return res.info("用户已存在");
      }

      // 将密码进行加密处理
      password = bcrypt.hashSync(password, 10);

      // 注册
      db.query(
        "insert into users set ?",
        req.body,
        (err, results) => {
          if (err) return res.send({ status: 0, message: err.message });

          if (results.affectedRows !== 1) {
            return res.info("注册失败！");
          }

          // res.send({ status: 1, message: "注册成功！" });
          res.info("注册成功", 200);
        }
      );
    }
  );
};

// 用户登录
exports.loginController = (req, res, next) => {
  let { username, password } = req.body;
  const login = userSchema.validate({ username, password });

  // 校验失败
  if (login.error) return res.info(login.error.details[0].message);

  // 查询用户是否存在
  db.query(
    "select * from users where username = ?",
    [username],
    (err, results) => {
      if (err) return res.info(err.methods);

      // 查询失败
      if (results.length === 0) {
        return res.info("没有此用户", 0);
      }


      // 判断用户账号密码是否正确
      let compareresults = bcrypt.compareSync(password, results[0].password);

      // 密码校验失败
      if (!compareresults) {
        return res.info("密码输入错误失败");
      }

      // 生成token
      const token = jwt.sign({ username }, secretKey, {
        //以毫米为单位，5000 = 5秒 ：expiresIn: "5000"
        // 天：1 days
        // 时：1h
        expiresIn: "7 days",
      });

      res.send({
        status: 200,
        message: "登录成功",
        token,
        data: results[0] || {},
        success: true,
      });
    }
  );
};
