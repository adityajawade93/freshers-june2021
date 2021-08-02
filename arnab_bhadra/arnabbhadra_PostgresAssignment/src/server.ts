import {app} from "./Application/app";
import {portNumberValidation} from "./Application/validation"



const dotenv = require('dotenv');
const path = require('path');
dotenv.config({ path: path.join(__dirname, './../../.env') });

try{
    portNumberValidation.validateAsync({port:process.env.PORT});
    app.listen(process.env.PORT,()=>{
        console.log("Server started at",process.env.PORT);
    });
}
catch{
    console.log("Error occured");
}
