/* eslint-disable no-console */
const { app } = require('./index');

const port = 3000;

app.listen(port, () => {
  console.log('server is active on port', port);
});
