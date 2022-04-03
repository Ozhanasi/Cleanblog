const express = require('express');
const mongoose = require('mongoose');

const ejs = require('ejs');
const path = require('path');
const Posts = require('./models/Posts');


const app = express();

//connect DB
mongoose.connect('mongodb://localhost/cleanblog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//TEMPLATE ENGİNE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//ROUTES
app.get('/', async (req, res) => {
  const posts = await Posts.find({});
  res.render('index', {
    posts
  });
});
app.get('/posts/:id', async (req, res) => {
  const post = await Posts.findById(req.params.id);
  res.render('post', {
    post
  });
});

app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add_post', (req, res) => {
  res.render('add_post');
});
app.get('/post', (req, res) => {
    res.render('post');
});
app.post('/posts', async(req, res) => {
  await Posts.create(req.body)
  res.redirect('/')
});

const port = 3000;
app.listen(port, (req, res) => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});
