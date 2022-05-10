const Post = require('../models/Post')

exports.getAbautPage = (req, res) => {
  res.render('about');
};

exports.getAddPage = (req, res) => {
  res.render('add_post');
};

exports.getPostPage = (req, res) => {
  res.render('post');
};

exports.getEditPage = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  res.render('edit', {
    post,
  });
};