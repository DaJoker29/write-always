import { Router } from 'express';
import { readdirSync } from 'fs-extra';
import Log from '@tools/log';

const log = Log('routes');

export default function() {
  const router = Router();
  const routes = readdirSync(__dirname).filter(
    a => a.search('index.js') === -1
  );

  routes.forEach(route => {
    const module = route.slice(0, -3);
    log(`Found ${module.toTitleCase()}`);
    /* eslint-disable-next-line import/no-dynamic-require */
    router.use('/', require(`./${module}`).default);
  });

  return router;
}
