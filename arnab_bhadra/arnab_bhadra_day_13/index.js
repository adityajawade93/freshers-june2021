const {app} = require("./PassengerApp");

app.listen(3000,()=>{
    console.log("Server is up and running");
});

module.exports = {app};