import app from "./app/app";

const port = +process.env.PORT!;

app.listen(port, () => {
  console.log("server is active on port", port);
});
