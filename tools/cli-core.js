import program from 'commander';
import Models from '@server/models';
import base32 from 'thirty-two';
import encodeurl from 'encodeurl';
import config from '@config';
import db from '@server/db_connect';

const { User } = Models;

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
        const user = await User.create({ username, email, displayName });
        console.log(user);
      } catch (e) {
        console.error(e.message);
      }
    }

    // Generate QR Code for Authenticator
    if ('qr' === cmd) {
      const { username } = options;

      try {
        const user = await User.findOne(
          { username },
          { token: 1, username: 1 }
        );
        const name = config.app.name;
        const mode =
          config.env === 'production' ? '' : ` [${config.env.toUpperCase()}]`;
        const secret = base32
          .encode(user.token)
          .toString()
          .replace(/=/g, '');

        const uri = `otpauth://totp/${name} (${
          user.username
        })${mode}?secret=${secret}`;
        const encoded = encodeurl(uri);

        console.log(
          `QR Code: https://chart.googleapis.com/chart?chs=166x166&chld=L|0&cht=qr&chl=${encoded}`
        );
      } catch (e) {
        console.error(e);
      }
    }

    //////////////////////////////
    // Disconnect from Database //
    //////////////////////////////
    db.close();
  });

program.parse(process.argv);
