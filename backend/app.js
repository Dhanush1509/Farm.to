import express from "express";
import cloudinary from "cloudinary";
import { notFound, errorHandler } from "./middlewares/errorHandler.js";
import users from "./routes/user.js";
import articles from "./routes/article.js";
import DB_CONNECT from "./config/db.js";
import dotenv from "dotenv";
import path from "path";

const app = express();

dotenv.config();
cloudinary.config({
  cloud_name: "dhanush1509",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

DB_CONNECT();
app.use(express.json());
app.use("/api/users", users);
app.use("/api/articles", articles);

const __dirname = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running");
  });
}

app.use(notFound);
app.use(errorHandler);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server is running at ${PORT}`));