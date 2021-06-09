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
const {createTask,getTask,updateTask,deleteTask,getTaskById} = require('./routes_and_controller.js');
const parse = require('url-parse');
const port = 3000;


http.createServer((req, res) => {
    if (req.method == 'POST' && req.url==="/todo" && req.headers['content-type'] === 'application/json')
    
        createTask(req, res);
    else if (req.method == 'GET' &&  req.url==="/todo") {
        // console.log("go");
        getTask(req, res);
    }

    else if (req.method == 'GET' && req.url.match("/todo/+").length>0) {
        // console.log("go");
        // console.log(req.url);
        getTaskById(req, res);
    }

    else if (req.method=="PUT" && req.url.match("/todo/+").length>0  && req.headers['content-type'] === 'application/json') {
        updateTask(req, res);
    }
    else if (req.method == 'DELETE'  && req.url.match("/todo/+").length>0) {
        deleteTask(req, res);
    }
}).listen(port, () => {
    console.log("server started at port", port);
});