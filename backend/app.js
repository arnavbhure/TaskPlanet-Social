require("dotenv").config();
const express = require("express");
const http = require("http");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/authRouter");
const connectDB = require("./config/mongodb");

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

connectDB().then(() => {
  server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
});
