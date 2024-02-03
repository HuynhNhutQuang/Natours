// import environment variable by dotenv
const dotenv = require('dotenv');
dotenv.config({ path: `./config.env` });
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});
// connect database by mongoose
const mongoose = require('mongoose');
const DB = process.env.DB_DATABASE.replace(
  '<password>',
  process.env.DB_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connect successful'));

const app = require('./app');

// create server by express
const server = app.listen(process.env.PORT, () => {
  console.log('Listening to the web app .....');
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
