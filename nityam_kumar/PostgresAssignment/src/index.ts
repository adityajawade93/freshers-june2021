import app from "./app/app";

import { pgConnect } from "./db/index";

import { config } from "./config/config";

const port = config.Port;

async function startServer() {
  await pgConnect();
  app.listen(port, () => {
    console.log("server is active on port", port);
  });
  
}

startServer();
