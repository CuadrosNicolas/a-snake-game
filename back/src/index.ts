import * as express from 'express';
import { connectDB } from './init/initDB';
import routes from './routes/routes';

connectDB().then((_) => {
  const app = express();
  routes(app);
  app.listen(8080);
})