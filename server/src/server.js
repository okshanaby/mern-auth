import express from "express";
import { createUser, login } from "./controllers/authController.js";
import connectDB from "./lib/mongodb.js";
import { inputValidator } from "./middleware.js";
import {
  loginInputSchema,
  registerInputSchema,
} from "./modules/validations.js";

const app = express();
connectDB();

app.use(express.json()); // middleware to let the client send a json

app.get("/", (req, res) => {
  res.send("API WORKING");
});

app.post("/register", inputValidator(registerInputSchema), createUser);
app.post("/login", inputValidator(loginInputSchema), login);

export default app;
