import { Context } from "vm";

let koa= require('koa');
let app= new koa();

let koarouter = require('@koa/router');
let router = new koarouter();

let bodyparser = require('koa-bodyparser');

let fs = require('fs');
let uuid = require('uniqid');



app. use(bodyparser());
app.use(router.routes());

class Passanger{
    _id:string;
    name:string;
    trips:number;
    airline:any[];
    __v:number;

    constructor(_id:string, name:string, trips:number, airline:any[], __v:number){
        this._id = _id;
        this.name = name;
        this.trips = trips;
        this.airline = airline;
        this.__v = __v;
    }

};

let passangerData : Passanger[] = require('../passangers.json');

function isValidPassangerData(page: number, size:number){

    let totalData: number= passangerData.length;

    if(size===0 || totalData===0)return false;

    let totalPages: number = Math.ceil(totalData/size);

    return (page>=0 || page<totalPages);
}

function fetchpassangerData(page: number,size: number){

    if(!isValidPassangerData(page,size))return [];

    let totalData: number= passangerData.length;

    let startindex: number = page*size;
    let endIndex: number = Math.min(page*size+size-1, totalData-1);

    return passangerData.slice(startindex,endIndex+1);
};

function getPassangerById(id:any):number{
    if(id==null || typeof id!=='string'){
        return -1;
    }
    for(let i: number = 0;i<passangerData.length;i++){
        if(passangerData[i]._id===id){
            return i;
        }
    }
    return -1;
}

function storeData(data:any, path:string){
    try{
        fs.writeFileSync(path, JSON.stringify(data));
    }
    catch(err){
        console.log(err);
    }
}


// get route 

async function fetchPassanger(ctx: Context){
    let page = ctx.request.query.page;
    let size = ctx.request.query.size;

    if(isNaN(page) || isNaN(size) || page<0 || size< 0){
        ctx.response.status = 400;
        ctx.body={
            "msg": "query incorrect"
        }
        return;
    }

    const passangerlist: Passanger[] = fetchpassangerData(page,size);

    ctx.response.status=200;
    ctx.body={
        total: passangerData.length,
        this_page_length: passangerlist.length,
        data: passangerlist
    }
}

// post route

async function addPassanger(ctx: Context){
    const newPassangerData = ctx.request.body;
    // name property mandatory
    if(newPassangerData.name==null || typeof newPassangerData.name !== 'string' 
    || typeof newPassangerData.trips !== 'number' || typeof newPassangerData.__v !== 'number' 
    || !Array.isArray(newPassangerData.airline)) {


        ctx.response.status=404;
        ctx.body={
            Error: "Invalid Passanger data"
        }
        return;
    }

    try {

        const id= uuid();
        let AddingPassangerData: Passanger= new Passanger(id, newPassangerData.name.trim(), 
        newPassangerData.trips, newPassangerData.airline, newPassangerData.__v) 

        passangerData.push(AddingPassangerData);

        storeData(passangerData, './passangers.json');

        ctx.response.status = 200;
        ctx.body={
            status:  "data added successfully",
            newlength: passangerData.length,
            newdata: AddingPassangerData
        }
    }

    catch(err){
        ctx.response.status= 404;
        ctx.body={
            error: 'something went wrong'
        }
    }
}

// Put Route

function updatePassanger(ctx:Context){
    let id: number= getPassangerById(ctx.params.id);
    if(id==-1){
        ctx.request.status= 400;
        ctx.body={
            error: 'passanger id not found'
        }
        return;
    }

    try{
        let updatedPassanger = ctx.request.body;
        
        if(updatedPassanger.name) passangerData[id].name = updatedPassanger.name;
        if(updatedPassanger.trips) passangerData[id].trips = updatedPassanger.trips;
        if(updatedPassanger.airline) passangerData[id].airline = updatedPassanger.airline;
        if(updatedPassanger.__v) passangerData[id].__v = updatedPassanger.__v;

        storeData(passangerData, './passangers.json');

        ctx.response.status=200;
        ctx.body={
            message: `passanger details updated on ${id} index`,
            data: passangerData
        }
    }
    catch(err){
        console.log(err);
    }
    
}


router.get('/v1/passangers', fetchPassanger);

router.post('/v1/passangers', addPassanger);

router.put('/v1/passangers/:id', updatePassanger);

const server =app.listen(3000,()=>{
    console.log('server is listening at port 3000');
})

module.exports = {
    server,
    passangerData,
    fetchpassangerData
};