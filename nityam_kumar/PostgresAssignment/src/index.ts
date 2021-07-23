import app from "./app/app";
import { config } from "./config/config";
const port = config.port;
import { pool } from "./db/index";
pool.on("error", (err, client) => {
  console.error("Unexpected error on idle client", err);
  process.exit(-1);
});

app.listen(port, () => {
  console.log("server is active on port", port);
});
