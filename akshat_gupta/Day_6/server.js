const toDoApp = require('./toDoKoa')

const port = 3000;
const server = toDoApp.listen(port);
console.info(`Listening to http://localhost:${port} 🚀`);