import app from "./app/index";
const config = require("./config/config");


const port = config.dbPort;
const host = config.dbHost;

app.listen(port, () => {
	console.log(`Server listening on http://${host}:${port}`);
});
