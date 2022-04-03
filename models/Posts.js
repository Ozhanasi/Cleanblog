const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create schema
const PostsShema = new Schema({
  title: String,
  detail: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Posts = mongoose.model('Posts', PostsShema);

module.exports = Posts;
