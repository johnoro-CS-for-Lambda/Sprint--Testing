const router = require('express').Router();
const games = require('./games');

const routes = {
  '/': [
    'get',
    'post'
  ],
  '/:id': [
    'get',
    'put',
    'delete'
  ]
};

Object.keys(routes).forEach(route => {
  routes[route].forEach(endpoint => {
    router.route(route)[endpoint](
      games[endpoint.toUpperCase()]
    );
  });
});

module.exports = router;
