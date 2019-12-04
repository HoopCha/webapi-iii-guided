//libraries
const express = require('express'); // importing a CommonJS module
const helmet = require('helmet');

//personal files
const hubsRouter = require('./hubs/hubs-router.js');

//declared variables
const server = express();

//custom middleware
function logger(req, res, next) {
  console.log(`${req.method} tp ${req.originalURL}`);
  next();
}

function gateKeeper(req, res, next) {
  const password = req.headers.password;
  if (password && password.toLowerCase() === "mellon") {
    next();
  } else {
    res.status(401).json({ you: "shall not pass!!" });
  }
}

// middleware
server.use(helmet());
server.use(express.json());
server.use(logger)

//endpoints
server.use('/api/hubs', hubsRouter);

server.get('/', (req, res) => {
  const nameInsert = (req.name) ? ` ${req.name}` : '';

  res.send(`
    <h2>Lambda Hubs API</h2>
    <p>Welcome${nameInsert} to the Lambda Hubs API</p>
    `);
});

server.get('/echo', (req, res) => {
  res.send(req.headers);
});

server.get('/area51',  gateKeeper, (req, res) => {
  res.send(req.headers);
});

module.exports = server;
