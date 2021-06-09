//importing some library
let fs = require("fs")
let http = require("http")
let url = require("url")
let uniq = require("uniqid")
let port = 3001

//creating some tasks
var task = []

const createTask = function (info) {
    this.id = uniq();
    this.date = new Date();
    this.info = info;
}
let task1 = new createTask('Assingment1');
let task2 = new createTask("Assignment2");
let task3 = new createTask("Assignment3");
task.push(task1);
task.push(task2);
task.push(task3);
// console.log(task)

//finding task by id
const findTaskByID = function (id) {
    var i = 0;
    for (i = 0; i < task.length; i++) {
        if (task[i].id == id)
            return i;
    }
    return "no";
}


//Starting the server at port 3001

http.createServer((req, res) => { // all request will have req, res
    if (req.method === 'GET') {
        handleRequest(req, res);
    } else {
        attachBodyToRequest(req, res, handleRequest)
    }
}).listen(port, () => {
    console.log("server started at port", port);
});


let handleRequest = (req, res) => {
    //print the data
    console.log("Got request =>", {
        method: req.method,
        path: req.url,
        contentType: req.headers['content-type'],
        body: req.body
    });

    //Get method
    if(req.method === "GET")
    {

        if (req.url === "/gettask") 
        {
            res.writeHead(200);
            res.end(JSON.stringify(task, null, 2));
        }
        else if (req.url.match("/gettask/+").length > 0) {
            var id = req.url.split("/")[2];
            let taskId = findTaskByID(id);
            if (taskId == "no") 
            {
                res.writeHead(404);
                res.write('Task Not Found');
                res.end();
            }
         else
         {
            res.writeHead(200);
            res.end(JSON.stringify(task[taskId]));
         }
        }
    }    

    //Post method

    else if (req.method === 'POST' && req.url === '/post') {

        let new_task = new createTask(req.body.title);
        task.push(new_task);
        res.writeHead(200);
        res.write('Task created');
        res.end();
    }

    //put method
    else if (req.method === 'PUT')
    {
        if(req.url.match("/updatetask/+").length > 0)
        {
            var id = req.url.split("/")[2];
            let taskId = findTaskByID(id);
            if (taskId == "no") 
            {
                res.writeHead(404);
                res.write('Task Not Found');
                res.end();
            }
            else
            {
                if (req.body.info)
                task[taskId].info = req.body.info;
                res.writeHead(200);
                res.write('Task Updated');
                res.end();

            }
        }
        else 
        {
            res.writeHead(404);
             res.write('Task Not Found');
             res.end();
        }
        
    }
     
    //delete method

    else if(req.method==="DELETE")
    {
        if(req.url.match("/deletetask/+").length>0)
        {
            let id = req.url.split('/')[2];
            let taskId = findTask(id);
            if (taskId === "no") {
                res.writeHead(404);
                res.write('task Not Found');
                res.end();
            }
            else {
                task.splice(taskId, 1);
                res.writeHead(200);
                res.write('Task deleted');
                res.end();
            }
        }
        else 
        {
            res.writeHead(404);
            res.write('task Not Found');
            res.end();
        }
    }
   
 }

    let attachBodyToRequest = (req, res, callback) => {
        let body = '';
        //let count = 0;
        req.on('data', (data) => {
            //  count++;
            //  console.log('count', count);
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