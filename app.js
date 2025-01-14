const express = require("express");
const app = express();
const postsRoutes = require("./api/posts/posts.routes");
const authorRouter = require("./api/author/routes");
const tagsRouter = require("./api/tag/routes");
const connectDb = require("./database");

app.use(express.json());
app.use("/posts", postsRoutes);
app.use("/authors", authorRouter);
app.use("/tags", tagsRouter);
app.use((req, res, next) => {
  res.status(404).json({ message: "Path not found" });
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || "Internal Server Error",
  });
});
connectDb();

app.listen(8000, () => {
  console.log("The application is running on localhost:8000");
});
