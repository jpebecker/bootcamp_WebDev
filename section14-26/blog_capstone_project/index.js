const express = require('express');
const methodOverride = require('method-override');
const path = require('path');

const posts = require('./data/posts');
const postsRouter = require('./routes/posts');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.render('index', { posts: posts.getAll() });
});

app.use('/posts', postsRouter);

app.use((req, res) => {
  res.status(404).render('not-found');
});

app.listen(PORT, () => {
  console.log(`server running at http://localhost:${PORT}`);
});