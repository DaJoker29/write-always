#!/usr/bin/env node

require('module-alias/register');
require('@babel/register');
require('@babel/polyfill');
require('@app/utils');

const program = require('commander');
const { User } = require('@server/models');
const base32 = require('thirty-two');
const config = require('@app/config');
const db = require('@app/db_connect');

program
  .description(`CLI tool for the ${config.pkg.name.toUpperCase()} app`)
  .version(config.pkg.version);

program
  .command('user [cmd]')
  .description('Handle User Data')
  .alias('u')
  .option('-u, --username <username>', 'Username')
  .option('-e, --email <email>', 'Email Address')
  .option('-n, --displayName [displayName]', 'Display Name')
  .action(async function userCb(cmd, options) {
    // Create User
    if ('create' === cmd) {
      const { username, email, displayName } = options;

      try {
        await User.create({ username, email, displayName });
        console.log(await User.find());
      } catch (e) {
        console.error(e.message);
      }
    }

    // Generate QR Code for Authenticator
    if ('qr' === cmd) {
      const { username } = options;

      try {
        const user = await User.findOne({ username });
        console.log(cmd);
        console.log(options);
        console.log(username);
        console.log(user);
        const name = config.app.name.replace(/ /g, '');
        const mode = config.env === 'production' ? '' : '-' + config.env;
        const secret = base32
          .encode(user.token)
          .toString()
          .replace(/=/g, '');

        const uri = `otpauth://totp/${name}${mode}:${
          user.username
        }?secret=${secret}`;

        console.log(
          `QR Code: https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=${uri}`
        );
      } catch (e) {
        console.error(e);
      }
    }

    // Print totp
    if ('totp' === cmd) {
      const { username } = options;

      await User.findOne({ username })
        .then(user => {
          const notp = require('notp');
          console.log(
            `Access Code (valid for 30sec): ${notp.totp.gen(user.token)}`
          );
        })
        .catch(e => console.error(e.message));
    }

    if (!cmd || 'list' === cmd) {
      await User.find({})
        .then(users => {
          const notp = require('notp');
          users.forEach(user => {
            console.log(
              `${user.username} - ${user.email}\n Access Code: ${notp.totp.gen(
                user.token
              )}\n`
            );
          });
        })
        .catch(e => console.error(e.message));
    }

    //////////////////////////////
    // Disconnect from Database //
    //////////////////////////////
    db.close();
  });

program.parse(process.argv);
