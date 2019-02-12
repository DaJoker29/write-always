export default {
  mode: 'staging',
  db: 'mongodb://localhost/write_always_staging',
  port: process.env.PORT || 4001
};
