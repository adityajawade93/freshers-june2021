import path from 'path';
import app from './app/index';

require('dotenv').config({ path: path.join(__dirname, '../.env') });

const { port } = process.env;

app.listen(port, () => {
  console.log(`server is running on port = ${port}`);
});
