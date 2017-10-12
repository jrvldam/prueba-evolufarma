const uuid = require('uuid/v1');
const Campaign = require('../models/campaign');
const { request } = require('../services');

exports.save = function (req,res, next) {
  let { name, title, subject, recipents, schedule, html  } = req.body;

  if (!name) {
    return res.status(422).json({ error: 'campaign name is mandatory'});
  }

  const _id = uuid();
  
  Campaign.findOne({ name }, function (err, exsistingCampaign) {
    if (err) return next(err);

    if (exsistingCampaign) {
      return res.status(422).json({ error: 'name campaign is in use'});
    }

    const campaign = new Campaign({
      _id,
      name,
      title,
      subject,
      recipents,
      schedule,
      html
    });

    campaign.save(function (err) {
      if (err) return next(err);

      request('http://localhost:4000/api/saveRegistry', {
        schedule,
        total_recipents: recipents.length
      })
      .then(() => res.json({ message: `New ${name} campaign saved` }))
      .catch(err => next({ RequestError: err }));
    });
  });
};

exports.get = function (req, res, next) {
  const _id = req.params.id;
  Campaign.findOne({ _id }, function (err, campaign) {
    if (err) return next(err);

    res.json(campaign);
  });
};

exports.list = function (req, res, next) {
  Campaign.find({}, function (err ,campaigns) {
    if (err) return next(err);

    res.json(campaigns);
  });
};

exports.mostActive = function (req, res, next) {
  Campaign.find({},function (err, campaigns) {
      if (err) return next(err);

      let mostActive = 0;

      for (let i = 0, len = campaigns.length; i < len; ++i) {
        mostActive = campaigns[i].recipents.length > mostActive ? i : mostActive;
      }

      res.json(campaigns[mostActive]);
  });
};
