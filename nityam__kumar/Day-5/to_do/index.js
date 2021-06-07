// CRUD for todo
// api to create todo , url /todo, method post
//  {
// id: unique id, Date.now(); uuid()
// createdDate
// title
// completed
// }
// api to update todo, url /todo/:id, method put
// api to list youll get all  todo, url /todo, method get
// api to read todo here you send id, url /todo/:id, method get
// api to delete todo, url /todo/:id, method delete

let http = require('http');
let fs = require('fs');
const uuid = require('uniqid');
const {createTask,getTask,updateTask,deleteTask} = require('./routes_and_controller.js');
const parse = require('url-parse');
const port = 3000;


http.createServer((req, res) => {
    if (req.method == 'POST' && parse(req.url, true).pathname == '/todo/createTask')
        createTask(req, res);
    if (req.method == 'GET' && parse(req.url, true).pathname == '/todo/getTask') {
        console.log("go");
        getTask(req, res);
    }
    if (req.method == 'PUT' && parse(req.url, true).pathname == '/todo/updateTask') {
        updateTask(req, res);
    }
    if (req.method == 'DELETE' && parse(req.url, true).pathname == '/todo/deleteTask') {
        deleteTask(req, res);
    }
}).listen(port, () => {
    console.log("server started at port", port);
});