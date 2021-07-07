
const app=require('./app')
const port :number= 3000;

app.listen(port,()=>{
    console.log("server is running on port ",port);
 });