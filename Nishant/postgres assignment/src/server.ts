import path from 'path';
import app from './app/index';

import config from './config/config';

app.listen(config.port, () => {
  console.log(`server is running on port = ${config.port}`);
});
