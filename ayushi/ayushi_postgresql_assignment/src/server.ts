export{};
const {app} = require('./index.ts');
const port = process.env.PORT || 3000;

app.listen(port,()=>{
  console.log(`The server is running at port number ${port}`);
});

module.exports = app;
