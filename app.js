const express = require('express');
const mongoose = require('mongoose');
const methodOverride = require('method-override')

const ejs = require('ejs');
const path = require('path');
const postController = require('./Controllers/postControllers')
const pageController = require('./Controllers/pageController')


const app = express();

//connect DB
mongoose.connect('mongodb+srv://ozhan:fkE2p7j4SgwgvXGy@cluster0.oexel.mongodb.net/cleanblog-db?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(()=>{
  console.log('DB CONNECTED!');
}).catch((err)=>{
  console.log(err);
})

//TEMPLATE ENGİNE
app.set('view engine', 'ejs');

//MIDDLEWARES
app.use(express.static('public'));
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(methodOverride('_method', {
  methods:['POST', 'GET']
}));

//ROUTES
app.get('/', postController.getAllPosts);
app.get('/posts/:id', postController.getPost);
app.post('/posts', postController.createPost);
app.put('/posts/:id', postController.updatePost);
app.delete('/posts/:id', postController.deletePost);

app.get('/about', pageController.getAbautPage);
app.get('/add_post', pageController.getAddPage);
app.get('/post', pageController.getPostPage);
app.get('/posts/edit/:id', pageController.getEditPage);

const port = process.env.PORT || 5000;
app.listen(port, (req, res) => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});
