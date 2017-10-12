const { save, list, get, mostActive } = require('./controlers/campaigns');

module.exports = function (app) {
  app.post('/api/saveCampaign', save);
  app.get('/api/getCampaign/:id', get);
  app.get('/api/listCampaigns', list);
  app.get('/api/getMostActiveCampaign', mostActive);
}
