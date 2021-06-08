let http = require('http');
const { v4: uuidv4 } = require('uuid');

class ToDo {
    constructor(id, createdDate, title, completed) {
        this.id = id;
        this.createdDate = createdDate;
        this.title = title;
        this.completed = completed;
    }
}

let todos = [];

const port = 3001;

http.createServer((req, res) => { // all request will have req, res
    if (req.method === 'GET') {
        handleRequest(req, res);
    } else {
        attachBodyToRequest(req, res, handleRequest)
    }
}).listen(port, () => {
    console.log("server started at port", port);
});

function validTodoData(data) {
    if (!data || !data.title) return false;
    return true;
}

function getTodoIndex(id) {
    for (let index = 0; index < todos.length; index++) {
        const todo = todos[index];
        if (todo.id === id) return index;
    }
    return -1;
}

function successResponse(res, message) {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    const data = JSON.stringify(message);
    res.end(data);
}

function errorResponse(res, message) {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write(message);
    res.end();
}

let handleRequest = (req, res) => {
    console.log("Got request =>", { 
        method: req.method, 
        path: req.url, 
        contentType: req.headers['content-type'], 
        body: req.body 
    });

    if (req.method === 'POST' && req.url === '/todo' && req.headers['content-type'] === 'application/json') {
        if (validTodoData(req.body)) {
            const id = uuidv4();
            const createdDate = new Date();
            const title = req.body.title;
            const completed = false;

            const todo = new ToDo(id, createdDate, title, completed);
            todos.push(todo);

            successResponse(res, todo);
        }
        else errorResponse(res, '<h2>Invalid Data</h2>');
    } 
    else if (req.method === 'PUT' && req.url.match("/todo/+").length > 0 && req.headers['content-type'] === 'application/json') {
        const id = req.url.split('/')[2];
        todoIndex = getTodoIndex(id);

        if (todoIndex !== -1) {
            if (req.body.hasOwnProperty("createdDate")) {
                // dd/mm/yyyy
                let dateParts = req.body.createdDate.split("/");
                // month is 0-based, that's why we need dataParts[1] - 1
                let dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
                todos[todoIndex].createdDate = dateObject;
            }
            if (req.body.hasOwnProperty("title")) {
                todos[todoIndex].title = req.body.title;
            }
            if (req.body.hasOwnProperty("completed") && typeof req.body.completed == "boolean") {
                todos[todoIndex].completed = req.body.completed;
            }

            successResponse(res, todos[todoIndex]);
        }
        else errorResponse(res, '<h2>Invalid Data</h2>');
    }
    else if (req.method === 'GET' && req.url === '/todo') {
        successResponse(res, todos);
    }
    else if (req.method === 'GET' && req.url.match("/todo/+").length > 0) {
        const id = req.url.split('/')[2];
        todoIndex = getTodoIndex(id);

        if (todoIndex !== -1) successResponse(res, todos[todoIndex]);
        else errorResponse(res, '<h2>Invalid Data</h2>');
    }
    else if (req.method === 'DELETE' && req.url.match("/todo/+").length > 0) {
        const id = req.url.split('/')[2];
        todoIndex = getTodoIndex(id);

        if (todoIndex !== -1) {
            const todo = todos[todoIndex];
            todos.splice(todoIndex, 1);

            successResponse(res, todo);
        }
        else errorResponse(res, '<h2>Invalid Data</h2>');
    }
    else errorResponse(res, '<h2>Not Found</h2>');
}

let attachBodyToRequest = (req, res, callback) => {
    let body = '';
    let count = 0;
    req.on('data', (data) => {
        count++;
        console.log('count', count);
        body += data;
    });
    req.on("end", _any => {
        if (req.headers['content-type'] === 'application/json') {
            req.body = JSON.parse(body);
        } else {
            console.log('Request Body of other mime types');
        }
        callback(req, res);
    });
}


// const todo = [{
//     id: '123',
//     createdDate: "7/06/2021",
//     title: "create todo app",
//     completed: false,
// }];


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