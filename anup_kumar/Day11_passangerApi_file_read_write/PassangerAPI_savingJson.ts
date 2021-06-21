let koa= require('koa');
let Router = require('@koa/router');
let bodyparser = require('koa-bodyparser');
let fs = require('fs');
let uuid = require('uniqid');
import { Context } from "vm";
let app=new koa();
let router=new Router();


class PassangerClass{
    _id:number;
    name:string
    trips:number;
    airline:any;
    __v:number;
    constructor(id:number,name:string,trips:number,airline:any,V:number)
    {
        this._id=id;
        this.name=name;
        this.trips=trips;
        this.airline=this.airline
        this.__v=V;
    }

}

let Passangers : PassangerClass[] = require('./Passenger.json');


function ValidatePassangerDetails(page:number,size:number):boolean
{
    if(size<=0 || page<0) return false;
    let totalPage= Math.ceil(Passangers.length/size);
    if(page>totalPage) return false;
    return true;
}


function getPassangerData(page:number,size:number):any
{
    let startIndex=page*size;
    let dataTobeShown=[];
    for(let i=startIndex;i<startIndex+size;i++)
    {
        dataTobeShown.push(Passangers[i]);
    }
    return dataTobeShown;
}


function getPassangerById(id:number):number
{
    for(let i:number = 0;i<Passangers.length;i++)
    {
        if(Passangers[i]._id === id) return i;
    }
    return -1;
}

function SaveData(data:any, path:string){
    try{
        fs.writeFileSync(path, JSON.stringify(data));
    }
    catch(err){
        console.log(err);
    }
}


router.get('/',(ctx:Context,next:any)=>
{

    var page = ctx.query.page;
    var size = ctx.query.size;
    if(ValidatePassangerDetails(page,size))
    {
        ctx.response.status = 200;
        ctx.body=getPassangerData(page,size);
        return ;
    }
    else
    {
        ctx.response.status = 404;
        ctx.body="No such data";
        return;
    }
   
});


router.post('/',(ctx:Context,next:any)=>
{
    const newPassangerData = ctx.request.body;

    if(newPassangerData!==null || typeof(newPassangerData.name)==='string' || typeof(newPassangerData.trips)=='number'
    ||typeof(newPassangerData.__v==='number'))
    {
        try 
        {

            const id= uuid();

            let previouLength=Passangers.length;

            let newPassangerInfo: PassangerClass= new PassangerClass(id, newPassangerData.name.trim(), 
            newPassangerData.trips, newPassangerData.airline, newPassangerData.__v) 
            Passangers.push(newPassangerInfo);
    
            SaveData(Passangers, './Passenger.json');
    
            ctx.response.status = 200;
            ctx.body=`data added successfully
            with previous length  was ${previouLength} and New length is  ${Passangers.length}`;

            return ;
        }
    
        catch(err){
            ctx.response.status= 404;
            ctx.body="some error occured";
            return;
        }

    }
    else
    {
        ctx.response.status=404;
        ctx.body="Invalid data";
        return ;
    }
    

});

router.put('/:id',(ctx:Context,next:any)=>
{
    let id:number=getPassangerById(ctx.params.id);
    if(id===-1)
    {
        ctx.response.status=400;
        ctx.body="No such data found";
        return ;
    }
    else
    {
        let updatedPassangerDetails=ctx.request.body;

        if(updatedPassangerDetails!==null ||typeof (updatedPassangerDetails.id) ==='string'||
        typeof(updatedPassangerDetails.name)==='string' || typeof(updatedPassangerDetails.trips)=='number'
        ||typeof(updatedPassangerDetails.__v==='number'))
        {
            Passangers[id].name = updatedPassangerDetails.name;
            Passangers[id].trips = updatedPassangerDetails.trips;
            Passangers[id].airline = updatedPassangerDetails.airline;
            Passangers[id].__v = updatedPassangerDetails.__v;
            
            SaveData(Passangers, './Passenger.json');
            
            ctx.response.status=200;
            ctx.body=`passanger details updated successfully`;
            
            return;
        }
        else
        {
        ctx.response.status=404;
        ctx.body="some error occured";
        return;
         }
        
    }


});
app. use(bodyparser());
app.use(router.routes());

app.use(router.routes())

app.listen(3001)