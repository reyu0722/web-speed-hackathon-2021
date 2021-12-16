
import Router from 'express-promise-router';
import serveStatic from 'serve-static';


import { CLIENT_DIST_PATH, PUBLIC_PATH, UPLOAD_PATH } from '../paths';

// SPA 対応のため、ファイルが存在しないときに index.html を返す

const routes = async (router) => {
  router.register(async (instance) => {
    instance.register(require('fastify-static'), {
      root: UPLOAD_PATH,
      wildcard: false,
      setHeaders: (res) => {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
      }
    })
  })

  router.register(async (instance) => {
    instance.register(require('fastify-static'), {
      root: PUBLIC_PATH,
      wildcard: false,
      setHeaders: (res) => {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
      }
    })
  })

  router.register(async (instance) => {
    instance.register(require('fastify-static'), {
      root: CLIENT_DIST_PATH,
      setHeaders: (res) => {
        res.setHeader('Cache-Control', 'public, max-age=31536000, immutable')
      }
    })
    .setNotFoundHandler((req, res) => {
      res.sendFile('index.html')
    })
  })
}

/*

router.use(
  serveStatic(UPLOAD_PATH, {
    immutable: true,
    maxAge: 1000 * 3600 * 24 * 365
  }),
);

router.use(
  serveStatic(PUBLIC_PATH, {
    immutable: true,
    maxAge: 1000 * 3600 * 24 * 365
  }),
);

router.use(
  serveStatic(CLIENT_DIST_PATH, {
    immutable: true,
    maxAge: 1000 * 3600 * 24 * 365,
    setHeaders: (res, path) => {
      if (serveStatic.mime.lookup(path) === 'text/html') {
        res.setHeader('Cache-Control', 'public, max-age=100')
      }
    }
  }),
);
*/

export { routes as staticRouter };
