require("dotenv").config();
const http = require("http");
const express = require("express");
const app = express();
const server = http.createServer(app);
const socket = require("./server/utils/socket");
const authRouter = require("./server/router/auth-router");
const contactRouter = require("./server/router/contact-router");
const userRouter = require("./server/router/userData-router");
const gameRouter = require("./server/router/gameData-router");
const connectDB = require("./server/utils/db");
const errorMiddleware = require("./server/middleware/error_middleware");
const paymentRouter = require("./server/router/payment-router");


app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ limit: "1mb", extended: true }));
app.use((req, res, next) => {
  res.setHeader(
    "Access-Control-Allow-Origin",
    `${process.env.FRONTEND_URL}`
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS,CONNECT,TRACE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, Authorization, X-Content-Type-Options, Accept, X-Requested-With, Origin, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Private-Network", true);
  //  Firefox caps this at 24 hours (86400 seconds). Chromium (starting in v76) caps at 2 hours (7200 seconds). The default value is 5 seconds.
  res.setHeader("Access-Control-Max-Age", 7200);

  next();
});

socket(server);
app.get("/", (req, res) => {
  res.status(200).send("KMCeSports Backend");
});
app.use("/", authRouter);
app.use("/", contactRouter);
app.use("/", userRouter);
app.use("/", gameRouter);
app.use("/", paymentRouter);

app.use(errorMiddleware);

const port = process.env.Port || 3000;

connectDB().then(() => {
  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
});
