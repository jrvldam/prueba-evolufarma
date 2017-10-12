const axios = require('axios');

exports.request = function (url, body) {
  return new Promise(function (resolve, reject) {
    axios.post(url, { ...body })
      .then(response => resolve(response))
      .catch(err => reject(err));
  });
};
