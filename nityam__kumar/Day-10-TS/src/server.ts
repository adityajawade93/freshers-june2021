import app from "./app";

const port: number= 5001;

app.listen(port, () => {
  console.log("server is active on port", port);
});
