require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const authRouter = require("./server/router/auth-router");
const contactRouter = require("./server/router/contact-router");
const userRouter = require("./server/router/userData-router");
const connectDB = require("./server/utils/db");
const errorMiddleware = require('./server/middleware/error_middleware');

var corsOptions = {
  origin: 'http://localhost:5173',
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
}

app.use(cors(corsOptions));

app.use(express.json());


app.use("/", authRouter);
app.use("/" , contactRouter);
app.use("/" , userRouter);

// app.get('/', (req, res)=>{
//     res.status(200).send('Hello World!');
// })
app.use(errorMiddleware);
const port = 3000;
connectDB().then(()=>{
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
});
