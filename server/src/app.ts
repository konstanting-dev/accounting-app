import path from 'path';
import express from 'express';
import cors from 'cors';
import logger from 'morgan';
import dotenv from 'dotenv';
import { urlencoded, json } from 'body-parser';
import initRoutes from 'src/routes';
import * as DatabaseService from 'src/services/database';
import { errorMiddleware } from './middlewares';

dotenv.config({ path: path.resolve(__dirname + '../.env') });

const CLIENT_BUILD_PATH = path.join(__dirname, '../../client/build');

export async function configureApp() {
  console.log(process.env.IMMUDB_API_COLLECTION);
  await DatabaseService.checkConnection().then((state) => {
    console.log('ImmuDB connected successful');
    console.log(state);
  });

  await DatabaseService.init().then((data) => {
    console.log(`Collection ${data.name} is initialized`);
  });

  const app = express();

  app.use(logger('dev'));

  app.use(cors());

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }));

  initRoutes(app);

  app.get('*', function (req, res) {
    res.sendFile(path.join(CLIENT_BUILD_PATH, 'index.html'));
  });

  app.use(errorMiddleware);

  return app;
}
