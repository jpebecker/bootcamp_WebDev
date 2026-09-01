const express = require('express');
const router = express.Router();
const posts = require('../data/posts');

router.get('/new', (req, res) => {
  res.render('new');
});

router.get('/:id/edit', (req, res) => {
  const post = posts.getById(req.params.id);

  if (!post) {
    return res.status(404).render('not-found');
  }

  res.render('edit', { post });
});

router.get('/:id', (req, res) => {
  const post = posts.getById(req.params.id);

  if (!post) {
    return res.status(404).render('not-found');
  }

  res.render('post', { post });
});

router.post('/', (req, res) => {
  const { title, carName, carYear, content, imageUrl } = req.body;

  if (!title || !content) {
    return res.status(400).render('new', {
      error: 'Title and content are required.',
      values: req.body
    });
  }

  const post = posts.create({ title, carName, carYear, content, imageUrl });
  res.redirect(`/posts/${post.id}`);
});

router.put('/:id', (req, res) => {
  const { title, carName, carYear, content, imageUrl } = req.body;

  if (!title || !content) {
    return res.status(400).render('edit', {
      error: 'Title and content are required.',
      post: { id: req.params.id, title, carName, carYear, content, imageUrl }
    });
  }

  const post = posts.update(req.params.id, { title, carName, carYear, content, imageUrl });

  if (!post) {
    return res.status(404).render('not-found');
  }

  res.redirect(`/posts/${post.id}`);
});

router.delete('/:id', (req, res) => {
  posts.remove(req.params.id);
  res.redirect('/');
});

module.exports = router;
