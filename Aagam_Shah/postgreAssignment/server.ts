// const app = require('./src/app').default;
import { app } from './src/app';

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server started on port ', port);
});

export default { app };
