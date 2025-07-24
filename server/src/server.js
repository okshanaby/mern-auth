import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import connectDB from "./lib/mongodb.js";
import authRouter from "./routes/authRoutes.js";
import userRouter from "./routes/userRoutes.js";

const app = express();
connectDB();

app.use(express.json()); // middleware to let the client send a json
app.use(cookieParser()); // middleware to read cookies for express
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, // must match withCredentials on client
  })
);

app.get("/", (req, res) => {
  res.send("API WORKING");
});

// ROUTES - AUTH
app.use("/api/auth", authRouter);

app.use("/api/user", userRouter);

export default app;
