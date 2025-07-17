import cookieParser from "cookie-parser";
import express from "express";
import connectDB from "./lib/mongodb.js";
import authRouter from "./routes/authRoutes.js";

const app = express();
connectDB();

app.use(express.json()); // middleware to let the client send a json
app.use(cookieParser()); // middleware to read cookies for express

app.get("/", (req, res) => {
  res.send("API WORKING");
});

// ROUTES - AUTH
app.use("/api/auth", authRouter);

export default app;
