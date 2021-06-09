const uuid = require('uniqid');
const parse = require('url-parse');
let taskList = [
    {
        id: "56",
        date: new Date,
        title: "sop",
        content: "soc",
        completed: true

    }, {
        id: "1234",
        date: new Date,
        title: "study",
        content: "book",
        completed: true
    }
];


class Task {

    constructor(date, title, content) {
        this.id = uuid();
        this.date = date;
        this.title = title;
        this.content = content;
        this.completed = true;
    }

}



module.exports.createTask = async (req, res) => {

    try {
        await attachBody(req, res);
        if (req.body.title == null) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.write('Title not found');
            res.end();

        }
        let task = new Task(new Date(), req.body.title, req.body.content);
        taskList.push(task);
        console.log(task);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write('Task Created');
        res.end();

    }
    catch (err) {
        console.log(err);
        res.writeHead(401, { 'Content-Type': 'text/html' });
        res.end();

    }
}


module.exports.getTask = async (req, res) => {

    res.writeHead(200, { 'Content-Type': 'application/json' });
    if (taskList.length == 0) res.end("No task");
    else {
        console.log(JSON.stringify(taskList));
        res.end(JSON.stringify(taskList));
    }


}


module.exports.getTaskById = async (req, res) => {

    try {
        let id = req.url.substring(6);
        // console.log(id);

        if (id === "") {
            // console.log("enter valid id",id);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write("please enter id");
            res.end();
        }
        else {

            let i = 0;
            for (; i < taskList.length; i++) {
                if (id == taskList[i].id) {
                    break;
                }
            }
            if (i == taskList.length) {
                res.writeHead(200, { 'Content-Type': 'text/plain' });
                res.write("Data provided is not availabe");
                res.end();
            }
            else {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                console.log(taskList[i]);
                res.write(JSON.stringify(taskList[i]));
                res.end();
            }

        }
    }
    catch (err) {
        console.log(err);
        res.writeHead(401, { 'Content-Type': 'text/html' });
        res.write('error occured');
        res.end();
    }








}

module.exports.updateTask = async (req, res) => {


    try {
        let id = req.url.substring(6);
        if (id === "") {
            // console.log("enter valid id",id);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write("please enter id");
            res.end();
        }
        else {
            let i = 0;
            for (; i < taskList.length; i++) {
                if (taskList[i].id == id)
                    break;
            }
            if (i == taskList.length) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.write('Task Not Found');
                res.end();
            }
            else {
                await attachBody(req, res);
                if (req.body.title)
                    taskList[i].title = req.body.title;
                if (req.body.content)
                    taskList[i].content = req.body.content;
                console.log(taskList[i]);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write('Task Updated Successfully');
                res.end();
            }
        }

    }
    catch (err) {
        console.log(err);
        res.writeHead(401, { 'Content-Type': 'text/html' });
        res.write('error occured');
        res.end();
    }

}

module.exports.deleteTask = async (req, res) => {

    try {
        let id = req.url.substring(6);
        if (id === "") {
            // console.log("enter valid id",id);
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.write("please enter id");
            res.end();
        }
        else {
            let i = 0;
            for (; i < taskList.length; i++) {
                if (taskList[i].id === id)
                    break;
            }
            if (i == taskList.length) {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.write('Task Not Found');
                res.end();
            }
            else {
                // const temp = taskList[i];
                taskList.splice(i, 1);
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write('Task deleted successfully');
                res.end();
            }

        }

    }
    catch (err) {
        console.log(err);
        res.writeHead(401, { 'Content-Type': 'text/html' });
        res.write('error occured');
        res.end();

    }
}

let attachBody = (req, res) => {

    return new Promise((resolve, reject) => {

        let body = '';
        req.on('data', (data) => {
            body += data;
        });
        req.on("end", () => {
            if (req.headers['content-type'] === 'application/json') {
                req.body = JSON.parse(body);
                resolve('request body attached successfully')
            } else {
                console.log('Request Body of other mime types');
            }



        });

    });
}

// const loadStaticFiles = (req, res) => {
//     const path = __dirname + '/public' + req.url;
//     // console.log(req.url, path);
//     fs.readFile(path, function (err, data) {
//         if (err) {
//             res.writeHead(404);
//             res.end(JSON.stringify(err));
//             return;
//         }
//         data = data.toString();
//         res.writeHead(200); // set status code
//         res.end(data);
//     });

// }

