import app from "./app";
const port = 3000;

export const server = async () =>{
    try {
        // start();
        // setpath();
        // tslint:disable-next-line:no-console
        console.log("db connected..");
        await app.listen(port);
        // tslint:disable-next-line:no-console
        console.log("started");
    }
    catch (err) {
        // tslint:disable-next-line:no-console
        console.log(err);
    }
}
