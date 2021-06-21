const koa = require('koa')
const koarouter = require('@koa/router')
const bodyparser = require('koa-bodyparser')
const fs = require('fs')
const uniqid = require('uniqid')

var app = new koa()
var router = new koarouter()
var passengersdata = JSON.parse(fs.readFileSync("passengers.json", "utf8"))

type airlinedatatype = {
    id: number
    name: string
    country: string
    slogan: string
    logo: string
    headquaters: string
    website: string
    established: number
}


class passenger {
    _id: string
    name: string
    trips: number
    airline: airlinedatatype
    __v: number
    constructor(name: string, trips: number, airline: airlinedatatype) {
        this._id = uniqid()
        this.name = name
        this.trips = trips
        this.airline = airline
        this.__v = 0
    }

}

var passengerdataarray: Array<passenger> = []
passengerdataarray = passengerdataarray.concat(passengersdata)


router.get('/v1/passengers', (ctx: any, next: any) => {
    let pageno = parseInt(ctx.query.page)
    let size = parseInt(ctx.query.size)
    console.log(pageno)

    if (pageno >= passengersdata.length || size < 0 || isNaN(pageno) || isNaN(size)) {
        ctx.response.status = 400
        ctx.body = "please give a proper pageno and size"
        return

    }

    let startindex: number = pageno
    let endindex: number = Math.min(startindex + size, passengersdata.length)

    console.log(startindex, endindex)

    ctx.body = JSON.stringify(passengersdata.slice(startindex, endindex), null, 2)

})

router.post('/v1/passengers', (ctx: any, next: any) => {
    let reqdata = ctx.request.body
    console.log(reqdata.airline)
    if (reqdata.name != null && reqdata.trips != null && reqdata.airline != null) {

        let passenger1: passenger = new passenger(reqdata.name, reqdata.trips, reqdata.airline)
        console.log(JSON.stringify(passenger1, null, 2))
        passengerdataarray = passengerdataarray.concat(passenger1)

        writefile(passengerdataarray)

        ctx.response.status = 200
        ctx.body = "passenger successfully created"

    } else {
        ctx.response.status = 404
        ctx.body = "passenger not created"
    }


})

router.put('/v1/passengers/:id', (ctx: any, next: any) => {
    let id: string = ctx.params.id
    console.log(id)
    if (id === "null" || typeof id != 'string' || id.trim().length == 0) {
        ctx.response.status = 400
        ctx.body = "please give a proper id"
        return
    }
    let reqdata = ctx.request.body
    console.log(reqdata)
    let i
    for (i = 0; i < passengerdataarray.length; i++) {

        if (passengerdataarray[i]._id == id) {
            console.log(i)
            let data: passenger = passengerdataarray[i]

            if (reqdata.name) {
                if ( typeof reqdata.name != 'string') {
                    ctx.response.status = 400
                    ctx.body = "please give a proper name"
                    return
                }
                data.name = reqdata.name
            }
            if (reqdata.trips) {
                if (typeof reqdata.trips != 'number' || reqdata.trips < 0) {
                    ctx.response.status = 400
                    ctx.body = "please give a proper trip number"
                    return
                }
                data.trips = reqdata.trips
            }
            if (reqdata.airline) {
                if (typeof reqdata.airline != 'object') {
                    ctx.response.status = 400
                    ctx.body = "please give a proper airline data"
                    return
                }
                data.airline = reqdata.airline
            }
            if (reqdata._v) {
                if(typeof reqdata._v != 'number'){
                    ctx.response.status = 400
                    ctx.body= "please give a proper __V"
                    return
                }
                 data.__v = reqdata._v 
                }

            passengerdataarray[i] = data
            writefile(passengerdataarray)

            ctx.response.status = 200
            ctx.body = 'passenger with '+id+' updated successfully'
            return

        } else {
            ctx.response.status = 404
            ctx.body = "id not found"

        }
    }


})

var writefile = (passengerarray: Array<passenger>) => {
    fs.writeFileSync('passengers.json', JSON.stringify(passengerarray, null, 2), 'utf8')
    return
}

app.use(bodyparser())
app.use(router.routes())
app.use(router.allowedMethods())
app.use(async (ctx: any) => {
    ctx.body = '404,error not found'
    ctx.response.status = 404
})
app.listen(3001)

module.exports = { app, passengerdataarray, passengersdata }

