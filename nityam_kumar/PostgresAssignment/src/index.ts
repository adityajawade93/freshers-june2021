import app from "./app/app";
import { connectDb } from "./db/index";
import { config } from "./config/config";
const port = config.port;

connectDb()
  .then(() => console.log("database connection successful"))
  .catch((err) => {
    console.log("DB connection failed!!", err.stack, err.message);
    console.error(err);
  });

app.listen(port, () => {
  console.log("server is active on port", port);
});
