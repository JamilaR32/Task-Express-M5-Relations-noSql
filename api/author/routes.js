const express = require("express");
const router = express.Router();
const { postsCreate, getAllAuthors, newAuthor } = require("./controllers");

router.post("/:authorId", postsCreate);
router.get("/", getAllAuthors);
router.post("/", newAuthor);
module.exports = router;
