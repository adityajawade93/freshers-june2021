const toDoApp = require('./toDoKoa.js');

const port = 3000;
const server = toDoApp.listen(port);
console.info(`Listening to http://localhost:${port} 🚀`);

module.exports = server;