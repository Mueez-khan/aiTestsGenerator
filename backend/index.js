import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import dbConnection from "./config/database.js";
import generateImage from "./routes/generateTestRoutes.js";
import userRoutes from "./routes/AuthRoutes.js";
import addToFavorite from "./routes/FavoriteCodeRoutes.js";
import generatedStories from "./routes/GeneratedTests.js";
import 'dotenv/config';

const app = express();

app.use(cookieParser()); // Parse cookies
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: ["http://localhost:5173", "http://192.168.19.63:5173"],
    methods: "GET, POST, PATCH, DELETE, PUT",
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

dbConnection();

app.use("/api/v1", generateImage);
app.use("/api/v1", userRoutes);
app.use("/api/v1", addToFavorite);
app.use("/api/v1", generatedStories);

app.get("/", (req, res) => {
  res.send("App is working bro");
});

app.listen(3000, () => {
  console.log("App is running on port 3000");
});