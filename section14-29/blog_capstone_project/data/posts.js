const { randomUUID } = require('crypto');

//Create template posts to populate the server (this posts appear when the server starts)
let posts = [
  {
    id: randomUUID(),
    title: 'Drift King?',
    carName: 'Toyota AE86',
    carYear: '1985',
    content:
      'There is something almost unfair about how good this car looks doing nothing at all. ' +
      'The AE86 was never fast by any modern measure, and it did not need to be. Light weight, ' +
      'a front engine, rear wheel drive layout, and a chassis that talks to you through every ' +
      'corner turned an unremarkable Corolla trim into a legend. This is where the idea for this ' +
      'blog came from: cars that matter are not always the ones with the biggest numbers.',
    imageUrl: 'https://hagerty-media-prod.imgix.net/2025/10/AE86-Corolla-Trueno-Replica-Car-Review.jpg?auto=format%2Ccompress&ixlib=php-3.3.0',
    createdAt: new Date('2026-08-31:10:00'),
    updatedAt: new Date('2026-08-31:11:00')
  },
  {
    id: randomUUID(),
    title: 'Understated Perfection',
    carName: 'Porsche 911 (964)',
    carYear: '1991',
    content:
      'The 964 generation gets overshadowed by the cars that came before and after it, and that ' +
      'is a shame. It was the first 911 with a fully galvanized body, power steering, and an ' +
      'available all wheel drive system, yet it kept the silhouette that makes a 911 a 911 at a ' +
      'glance from three blocks away. Driving one today feels like a bridge between two eras of ' +
      'the same idea, refined instead of reinvented.',
    imageUrl: 'https://images-porsche.imgix.net/-/media/10FBA4BAA221489FB939C72BBA80DDD8_231C1A9378704596BC82AE14484FF74F_022-content-chapter_964_turbo_1991-93?w=1299&q=85&auto=format',
    createdAt: new Date('2026-08-20:10:00'),
    updatedAt: new Date('2026-08-25:11:00')
  }
];

function getAll() {
  return [...posts].sort((a, b) => b.createdAt - a.createdAt);
}

function getById(id) {
  return posts.find((post) => post.id === id);
}

function create({ title, carName, carYear, content, imageUrl }) {
  const now = new Date();
  const post = {
    id: randomUUID(),
    title,
    carName,
    carYear,
    content,
    imageUrl,
    createdAt: now,
    updatedAt: now
  };
  posts.push(post);
  return post;
}

function update(id, { title, carName, carYear, content, imageUrl }) {
  const post = getById(id);
  if (!post) return null;

  post.title = title;
  post.carName = carName;
  post.carYear = carYear;
  post.content = content;
  post.imageUrl = imageUrl;
  post.updatedAt = new Date();

  return post;
}

function remove(id) {
  const index = posts.findIndex((post) => post.id === id);
  if (index === -1) return false;

  posts.splice(index, 1);
  return true;
}

module.exports = { getAll, getById, create, update, remove };
