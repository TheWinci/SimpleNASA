const app = require('express').Router();
const _ = require('lodash');
const axios = require('axios');

app.get('/', (req, res) => {
  res.json(
    {
      message: 'Asrtonomy Picture of the Day',
      availableFields: {
        date: {
          format: 'YYYY-MM-DD',
          default: 'today'
        },
        hd: {
          format: 'boolean',
          default: false
        }
      }
    }
  );
});

app.post('/', async (req, res) => {
  let getHD = false;
  let today = new Date();
  let date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  var errors = [];

  if (_.has(req.body, 'date')) {
    try {
      today = new Date(req.body.date);
      if (isNaN(today)) {
        throw `${req.body.date} is not a valid date x`;
      }
      date = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
    } catch (error) {
      errors.push(error);
    }
  }

  if (_.has(req.body, 'hd')) {
    if (typeof req.body.hd === 'boolean') {
      getHD = req.body.hd;
    }
    else {
      errors.push(`${req.body.hd} is not valid type, should be boolean`);
    }
  }

  if (errors.length > 0) {
    res
      .status(400)
      .json(
        {
          errors: errors
        }
      );
  }

  axios.get(`https://api.nasa.gov/planetary/apod?date=s${date}&hd=${getHD}&api_key=${process.env.NASA_API_KEY}`)
    .then(response => {
      res.json(response.data);
    })
    .catch(error => {
      res
        .status(error.response.data.code)
        .json(error.response.data);
    });
});

app.all('*', (req, res) => {
  res.status(404).json(
    {
      message: 'not found'
    }
  );
});

module.exports = app;