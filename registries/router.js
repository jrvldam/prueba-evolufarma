const { save, list } = require('./controlers/registries');

module.exports = function (app) {
  app.post('/api/saveRegistry', save);
  app.get('/api/listRegistry', list);
};
