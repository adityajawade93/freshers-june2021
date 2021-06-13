const {app,validateDate,validateTodo,}=require("./Todoapp");

app.listen(process.env.PORT);
// app.listen(4000,()=>{
//     console.log("Server started at 4000");
// })
module.exports={app}

