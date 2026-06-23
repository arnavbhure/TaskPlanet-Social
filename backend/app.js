require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
const connectDB = require("./config/mongodb");
const postRouter = require("./routes/postRouter");
const likeCommentRouter = require("./routes/likeCommentRouter");

const PORT = process.env.PORT; // Port number for the server to listen on

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  }),
);

const server = http.createServer(app);

app.use(express.json());
app.use(cookieParser());

/* Router for login and signup services */
app.use("/api/auth", authRouter);

/* Router for post services */
app.use("/api", postRouter);

/* Router for like and comment services */
app.use("/api", likeCommentRouter);

/* router for ping (to keep server awake) */
app.get("/api/ping", (req, res) => {
  res.status(200).json({ message: "ok" });
});

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
