import bodyParser from 'body-parser';
import Express from 'express';
import session from 'express-session';
import compression from "compression"
import Fastify from "fastify"

import { apiRouter } from './routes/api';
import { staticRouter } from './routes/static';

const createApp = async () => {

  const app = Fastify({
    trustProxy: true
  });

  await app.register(require('fastify-express'))

  app.use(
    session({
      proxy: true,
      resave: false,
      saveUninitialized: false,
      secret: 'secret',
    }),
  );

  app.use(bodyParser.json());
  app.use(bodyParser.raw({ limit: '10mb' }));

  app.use('/api/v1', apiRouter);

  app.use(compression())
  app.use(staticRouter);

  return app
}

export { createApp as app };
