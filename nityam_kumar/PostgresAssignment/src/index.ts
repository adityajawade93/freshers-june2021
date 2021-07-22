import app from "./app/app";

const port = 5002;

app.listen(port, () => {
  console.log("server is active on port", port);
});
