var http = require('http');
const uuid = require('uniqid');
const port = 8000;

class Todo {
  constructor(id, date, title, completed) {
    this.id = id;
    this.createdDate = date;
    this.title = title;
    this.completed = completed
  }
}

const todoList = [];
let todo = new Todo(uuid(), Date.now(), 'chess', false);
todoList.push(todo);
todo = new Todo(uuid(), Date.now(), 'carrom', true);
todoList.push(todo);

http.createServer((request, response) => {

  if (request.method === 'GET' && request.url.match(/\?.+=.*/g)) {
    var baseURL = 'http://' + request.headers.host + '/';
    var myURL = new URL(request.url, baseURL);

    let url = new URL(myURL);
    let search_params = url.searchParams;
    let id = search_params.get('id');

    let obj = undefined;
    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].id == id) {
        obj = todoList[i];
        break;
      }
    }
    if (obj === undefined) {
      response.writeHead(400, { 'Content-Type': 'text/html' });
      response.end("id not found");
    }
    else {
      response.on('error', (err) => {
        console.error(err.stack);
      })
      response.writeHead(200, { 'Content-Type': 'application/json' });
      response.end(JSON.stringify(obj));
    }
  }
  else if (request.method === 'GET' && request.url === '/todo') {

    response.on('error', (err) => {
      console.error(err.stack);
    });
    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.write(request.url);
    response.end(JSON.stringify(todoList));
  }
  else if (request.method === 'POST' && request.url === '/todo') {
    let body = [];
    request.on('error', (err) => {
      console.error(err);
    }).on('data', (chunk) => {
      body.push(chunk);
    }).on('end', () => {
      body = Buffer.concat(body).toString();

      response.on('error', (err) => {
        console.error(err);
      })
      //console.log(body);
      body = JSON.parse(body);
      let todo = new Todo(body["id"], body["createdDate"], body["title"], body["completed"]);
      console.log(todo);
      todoList.push(todo);

      response.writeHead(200, {
        'Content-Type': 'application/json'
      });
      response.write(JSON.stringify(todoList));
      response.end("POST request is successful!!");
    });
  }
  else if (request.method === 'PUT' && request.url.match(/\?.+=.*/g)) {

    var baseURL = 'http://' + request.headers.host + '/';
    var myURL = new URL(request.url, baseURL);

    let url = new URL(myURL);
    let search_params = url.searchParams;
    let id = search_params.get('id');

    let index = -1;

    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].id == id) {
        index = i;
        break;
      }
    }
    if (index === -1) {
      response.writeHead(400, { 'Content-Type': 'text/html' });
      response.end("id not found");
    }
    else {
      let body = [];
      request.on('error', (err) => {
        console.error(err);
      }).on('data', (chunk) => {
        body.push(chunk);
      }).on('end', () => {
        body = Buffer.concat(body).toString();

        response.on('error', (err) => {
          console.error(err);
        })

        body = JSON.parse(body);
        todoList[index].id = body.id;
        todoList[index].createdDate = body.createdDate;
        todoList[index].title = body.title;
        todoList[index].completed = body.completed;

        response.writeHead(200, {
          'Content-Type': 'application/json'
        });
        response.write(JSON.stringify(todoList));
        response.end("PUT request is successful!!");
      })
    }
  }
  else if (request.method === 'DELETE' && request.url.match(/\?.+=.*/g)) {
    var baseURL = 'http://' + request.headers.host + '/';
    var myURL = new URL(request.url, baseURL);

    let url = new URL(myURL);
    let search_params = url.searchParams;
    let id = search_params.get('id');

    let index = -1;

    for (let i = 0; i < todoList.length; i++) {
      if (todoList[i].id == id) {
        index = i;
        break;
      }
    }
    if (index === -1) {
      response.writeHead(400, { 'Content-Type': 'text/html' });
      response.end("id not found");
    }
    else {
      todoList.splice(index, 1);
      response.writeHead(200, {
        'Content-Type': 'application/json'
      });
      response.write(JSON.stringify(todoList));
      response.end("DELETE request is successful!!");
    }
  }
  else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('<h2>Not Found</h2>');
    res.end();
}
}).listen(port, () => {
  console.log(`The server is running at port ${port}`);
});
