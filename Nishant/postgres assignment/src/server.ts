import path from 'path';
import app from './app/index';

import config from './config/config';

const server = app.listen(config.port, () => {
  console.log(`server is running on port = ${config.port}`);
});
function stop() {
  server.close();
}
export default server;
