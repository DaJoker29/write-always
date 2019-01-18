import { Router } from 'express';
import VError from 'verror';
import Log from '@tools/log';

const errLog = Log('error');

export default function() {
  const router = Router();

  router.use(serverError);
  return router;
}

function serverError(err, req, res, next) {
  const error = new VError(err, 'Unhandled Server Error');
  errLog(error.stack);
  return res.sendStatus(500);
}
