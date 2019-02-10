export default {
  mode: 'production',
  db: process.env.MONGODB_URI || 'mongodb://localhost/write_always',
  port: process.env.PORT || 2000
};
