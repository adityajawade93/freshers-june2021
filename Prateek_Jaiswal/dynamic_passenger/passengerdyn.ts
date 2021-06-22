const koa = require('koa');
const koarouter = require('@koa/router');
const bodyparser = require('koa-bodyparser');
const fs = require('fs');
const uniqid = require('uniqid');

const port = process.env.port || process.env.PORT || 3001;

var app = new koa();
var router = new koarouter();
var temphold = JSON.parse(fs.readFileSync("passengers.json", "utf8")); //reading the passenger json file into a variable
var tempholdarray: Array<passenger> = [];
tempholdarray = tempholdarray.concat(temphold); //adding to and updating through an array 

interface Airline {
    id?: string;
    name?: string;
    country?: string;
    logo?: string;
    slogan?: string;
    head_quaters?: string;
    website?: string;
    established?: string;
  }
  
  class passenger {
    _id: string;
    name: string;
    trips: number;
    airline: Airline | Airline[];
    __v: number;
    constructor(name: string, trips: number, airline: Airline | Airline[]) {
      this._id = uniqid();
      this.name = name;
      this.trips = trips;
      this.airline = airline;
      this.__v = 0;
    }
  }

  router.get('/v1/passengers', (ctx: any, next: any) => {
    let pageno = parseInt(ctx.query.page)
    let size = parseInt(ctx.query.size)

    //validating the data
    if (pageno >= temphold.length ) {
        ctx.response.status = 400
        ctx.body = "error: invalid page no or size"
        return

    }
    if ( size < 0) {
      ctx.response.status = 400
      ctx.body = "error: invalid page no or size"
      return

  }
  if (isNaN(pageno) || isNaN(size)) {
    ctx.response.status = 400
    ctx.body = "error: invalid page no or size"
    return

}

    let start: number = pageno;
    let end: number = Math.min(start + size, temphold.length)

    ctx.body = JSON.stringify(temphold.slice(start, end), null, 2)

});
router.post('/v1/passengers', (ctx: any, next: any) => {
    let reqdata = ctx.request.body
    
    //validating the data
    if (reqdata.name != null && reqdata.trips != null && reqdata.airline != null) 
    {

        let passenger1: passenger = new passenger(reqdata.name, reqdata.trips, reqdata.airline);

         tempholdarray = tempholdarray.concat(passenger1) 

         fs.writeFileSync('passengers.json', JSON.stringify(tempholdarray, null, 2), 'utf8'); //writing

        ctx.response.status = 200;
        ctx.body = "passenger successfully created";

    } else {
        ctx.response.status = 404
        ctx.body = "error in creating the passenger"
    }


})
router.put('/v1/passengers/:id', (ctx: any, next: any) => {
    let id: string = ctx.params.id

    //validating the data
    if (id === "null") {
        ctx.response.status = 400
        ctx.body = "error: invalid id"
        return
    }
    if ( typeof id != 'string') {
      ctx.response.status = 400
      ctx.body = "error: invalid id"
      return
  }
  if (id.trim().length == 0) {
    ctx.response.status = 400
    ctx.body = "error: invalid id"
    return
}
    let reqdata = ctx.request.body;
    
    let i: number;
    //checking for the id in the file and updating the new information
    for (i = 0; i < tempholdarray.length; i++) {

        if (tempholdarray[i]._id == id) {

            let data: passenger = tempholdarray[i]

            if (reqdata.name) {
                if ( typeof reqdata.name != 'string') {
                    ctx.response.status = 400
                    ctx.body = "error: invalid name type"
                    return
                }
                data.name = reqdata.name
            }
            if (reqdata.trips) {
                if (typeof reqdata.trips != 'number' || reqdata.trips < 0) {
                    ctx.response.status = 400
                    ctx.body = "error: invalid trip number"
                    return
                }
                data.trips = reqdata.trips
            }
            if (reqdata.airline) {
                if (typeof reqdata.airline != 'object') {
                    ctx.response.status = 400
                    ctx.body = "error: invalid airline data type"
                    return
                }
                data.airline = reqdata.airline
            }
            if (reqdata._v) {
                if(typeof reqdata._v != 'number'){
                    ctx.response.status = 400
                    ctx.body= "error: invalid __v type"
                    return
                }
                 data.__v = reqdata._v 
                }

            tempholdarray[i] = data;
            fs.writeFileSync('passengers.json', JSON.stringify(tempholdarray, null, 2), 'utf8'); 

            ctx.response.status = 200
            ctx.body = 'passenger with '+id+' updated successfully'
            return

        } else {
            ctx.response.status = 404
            ctx.body = "error: id not found"

        }
    }


});
app.use(bodyparser());
app.use(router.routes());
app.use(router.allowedMethods());
app.use(async (ctx: any) => {
    ctx.body = 'error: 404 ! not found';
    ctx.response.status = 404;
})
app.listen(port, ()=>{
    console.log('server up ! at 3001');
});


module.exports = { app, tempholdarray, temphold }
