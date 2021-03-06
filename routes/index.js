const app = require('express')();

app.get('/', (req, res) => {
  res.json(
    {
      message: 'hello from base route'
    }
  );
});

app.use('/nasa', require('./nasa'));

app.all('*', (req, res) => {
  res.status(404).json(
    {
      message: 'not found'
    }
  );
});

module.exports = app;