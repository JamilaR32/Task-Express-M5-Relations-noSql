const Tag = require("../../models/Tag");
const Post = require("../../models/Post");
const tagAddtoPost = async (req, res, next) => {
  try {
    const postId = req.params.postId;
    const tagId = req.params.tagId;
    const post = await Post.findById(postId);
    const tag = await Tag.findById(tagId);
    if (!post || !tag) {
      return res.status(404).json("post Or tag Not found");
    }
    await post.updateOne({ $push: { tags: tag._id } });
    await tag.updateOne({ $push: { posts: post._id } });
    return res.status(204).end();
  } catch (error) {
    next(error);
  }
};

const newTag = async (req, res, next) => {
  try {
    const tag = await Tag.create(req.body);
    return res.status(201).json(tag);
  } catch (error) {
    next(error);
  }
};
const getAllTags = async (req, res, next) => {
  try {
    const tags = await Tag.find().populate("posts");
    return res.status(200).json(tags);
  } catch (error) {
    next(error);
  }
};

module.exports = { tagAddtoPost, getAllTags, newTag };
