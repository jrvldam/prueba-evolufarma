const Registry = require('../models/registry');

exports.save = function (req, res, next) {
  const { total_recipents, schedule } = req.body;

  if (!total_recipents || !schedule) {
    res.status(422).json({ error: 'all fields are mandatory'});
  }

  const registry = new Registry({
    total_recipents,
    schedule
  });

  registry.save(function(err) {
    if (err) return next(err);

    res.json({ schedule });
  });
};

exports.list = function (req, res, next) {
  Registry.find({}, function (err, registries) {
    if (err) return next(err);

    res.json(registries);
  });
};
