import fs from 'fs';
import path from 'path';
import callsite from 'callsite';
import Log from '@tools/log';

const log = Log('loading');

function indexify(namespace) {
  const stack = callsite();
  const dir = path.dirname(stack[1].getFileName());
  const files = fs.readdirSync(dir);
  const result = {};

  files.forEach(file => {
    if (file === 'index.js') return;
    const value = file.slice(0, -3);
    const key = value.charAt(0).toUpperCase() + value.slice(1);

    const mod = `${dir}/${value}`;
    /* eslint-disable-next-line import/no-dynamic-require */
    result[key] = require(mod).default || require(mod); // works for CJS or ESM
  });

  Object.getOwnPropertyNames(result).forEach(prop => {
    log(`${namespace.toTitleCase()}: ${prop}`);
  });
  return result;
}

export default indexify;
