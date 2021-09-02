export{};
//const {app} = require('./index.ts');
const makeapp = require('./index.ts');
const port = process.env.PORT || 3000;
const Router = require('./routes/main.ts');
const app = makeapp(Router);

app.listen(port,()=>{
  console.log(`The server is running at port number ${port}`);
});

module.exports = app;
