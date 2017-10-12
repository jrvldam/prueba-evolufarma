const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const router = require('./router');
const { uri, options } = require('./config');

mongoose.Promise = global.Promise;
mongoose.connect(uri, options);

const app = express();

app.use(bodyParser.json({ type: '*/*' }));

router(app);
app.use(errorStatus, errorRequest);

const port = process.env.PORT || 4000;

app.listen(port);
console.log(`Server listening on http://localhost:${port}`);

function errorStatus(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
}

function errorRequest(err, req, res, next) {
  if(err.status !== 404) console.log(err.message + err.stack);

  res.status(err.status || 500).json({
    Error: {
      message: err.message,
      error: app.get('env') === 'development' ? err : {},
      env: app.get('env')
    }
  });
}
