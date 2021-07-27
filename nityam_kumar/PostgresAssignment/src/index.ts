import app from "./app/app";

import { config } from "./config/config";

const port = config.port;

app.listen(port, () => {
  console.log("server is active on port", port);
});
