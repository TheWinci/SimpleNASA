const app = require('express')();

app.get('/', (req, res) => {
  res.json(
    {
      message: 'hello from nasa route'
    }
  );
});

app.use('/apod', require('./apod'));

app.all('*', (req, res) => {
  res.status(404).json(
    {
      message: 'not found'
    }
  );
});

module.exports = app;