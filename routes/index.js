var process = require('process');
var _ = require('lodash');

module.exports = app => {
  app.get('*', async (req, res) => {
    res.json({
      message: 'hello',
      process: process.pid
    });
  });

  app.post('*', async (req, res) => {
    let hasMessage = _.has(req.body, 'message');
    if (hasMessage) {
      res.status(200)
        .json({
          message: 'good'
        });
    } else {
      res.status(400)
        .json({
          message: 'bad'
        });
    }
  });
};