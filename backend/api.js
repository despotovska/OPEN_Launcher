const server = require('./server.js');
const paths = require('./paths.js');

require('./api/usersApi.js');
require('./api/loggedUserApi.js');
require('./api/imagesApi.js');

server.get('/', (req, res) => {
  res.sendFile(paths.indexPath);
});

server.listen(3000, () => {
  console.log('Working on port 3000');
});
