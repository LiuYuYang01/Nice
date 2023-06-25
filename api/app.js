const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

// 跨域
const cors = require("cors");

// 解析token
const { expressjwt } = require("express-jwt");

// 数据秘钥
const { secretKey } = require("./config/index");

// 用户路由
const loginRouter = require("./routes/user/login");
const userRouter = require("./routes/user/users");
// 分类路由
const cateRouter = require("./routes/cate/cate");
// 文章路由
const articleRouter = require("./routes/article/article");
// 标签路由
const tagRouter = require("./routes/tag/tag");
// 链接路由
const linkRouter = require("./routes/link/link");
// 评论路由
const commentRouter = require("./routes/comment/comment");
// 轮播图路由
const bannerRouter = require("./routes/banner/banner");
// 设置
const setRouter = require("./routes/setting/setting");


const app = express();

// 配置跨域
app.use(cors());

// 封装一个服务端响应消息
app.use((req, res, next) => {
  res.info = (err, status = 0, success = false) => {
    res.send({
      status,
      message: err instanceof Error ? err.methods : err,
      success,
    });
  };

  next();
});

// Token 身份认证
app.use(
  // 指定 /api/user 不需要进行Token身份认证
  expressjwt({ secret: secretKey, algorithms: ["HS256"] }).unless({
    path: [/^\/upload\//, /^\/api\//, /^\/api\/user\//],
    // path: [/^\/api\/user\//],
  })
);

//捕获错误的全局中间件
app.use(function (err, req, res, next) {
  //token过期
  if (err.status == 401) {
    res.status(401).send({ status: "token 过期！" });
    return;
  }
  if (err) {
    res.status(500).send({ status: "fail" });
  }
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// 用户路由
app.use("/api/user/", loginRouter);
app.use("/api/user/", userRouter);
// 分类路由
app.use("/api/cate/", cateRouter);
// 文章路由
app.use("/api/article/", articleRouter);
// 标签路由
app.use("/api/tag/", tagRouter);
// 链接路由
app.use("/api/link/", linkRouter);
// 评论路由
app.use("/api/comment/", commentRouter);
// 轮播图路由
app.use("/api/banner/", bannerRouter);
// 设置
app.use("/api/set/", setRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

app.use((err, req, res, next) => {
  res.send({ message: err.message });
});

module.exports = app;
