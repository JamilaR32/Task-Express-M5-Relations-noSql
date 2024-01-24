const Author = require("../../models/Author");
const Post = require("../../models/Post");

const postsCreate = async (req, res, next) => {
  try {
    const { authorId } = req.params;
    const author = await Author.findById(authorId);
    if (!authorId) {
      return res.status(404).json(" author Not Found");
    }
    const newPost = await Post.create(req.body);
    await author.updateOne({ $push: { posts: authorId } });
    res.status(201).json(newPost);
  } catch (error) {
    next(error);
  }
};
const getAllAuthors = async (req, res, next) => {
  try {
    const authors = await Author.find().populate("posts");
    return res.status(200).json(authors);
  } catch (error) {
    next(error);
  }
};

const newAuthor = async (req, res, next) => {
  try {
    const author = await Author.create(req.body);
    return res.status(201).json(author);
  } catch (error) {
    next(error);
  }
};
module.exports = { getAllAuthors, postsCreate, newAuthor };
