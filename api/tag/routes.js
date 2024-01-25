const express = require("express");
const { getAllTags, newTag, tagAddtoPost } = require("./controllers");
const router = express.Router();

router.post("/", newTag);
router.get("/", getAllTags);
router.put("/:tagId/:postId", tagAddtoPost);
module.exports = router;
