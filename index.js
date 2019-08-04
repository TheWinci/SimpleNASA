require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const cluster = require('cluster');
const numCPUs = 4;
// const numCPUs = require('os').cpus().length;

const appPort = process.env.PORT || 8080;

const app = express();
app.use(bodyParser.json());
app.set('json spaces', 2);
require('./routes')(app);

if (cluster.isMaster) {
  // console.log(`Master ${process.pid} is running`);
  
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  cluster.on('exit', (worker, code, signal) => {
    // console.log(`worker ${worker.process.pid} died`);
  });
} else {

  app.listen(appPort, () => {
    // console.log(`listening on ${appPort} with PID ${process.pid}`);
  });

  // console.log(`Worker ${process.pid} started`);
}

module.exports = app;