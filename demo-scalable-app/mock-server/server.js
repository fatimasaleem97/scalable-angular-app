const jsonServer = require('json-server');
const middleware = jsonServer.defaults();
const server = jsonServer.create();

server.use(middleware);
server.use(jsonServer.bodyParser);

const usersData = require('../mock-server/data/users');
const loginData = require('../mock-server/data/login');
const userData = require('../mock-server/data/user');

server.get('/api/users', (req, res, next) => {
  res.status(200).send(usersData.getUsers);
});

server.post('/api/login', (req, res, next) => {
  res.status(200).send(loginData.login);
});

server.get('/api/getUserById', (req, res, next) => {
  res.status(200).send(userData.getUserById);
});

server.listen(3000, () => {
  console.log('JSON server listening on port 3000');
});
