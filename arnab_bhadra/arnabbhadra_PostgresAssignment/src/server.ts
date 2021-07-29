import {app} from "./Application/app";
const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, './../../.env') });
app.listen(process.env.PORT,()=>{
    console.log("Server started at",process.env.PORT);
});