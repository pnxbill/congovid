// const { Sequelize } = require('sequelize');

// // Option 1: Passing a connection URI
// const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
// // const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres

// // Option 2: Passing parameters separately (sqlite)
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: './db.sqlite'
// });

// Option 2: Passing parameters separately (other dialects)
// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
// });


module.exports = {
  DB_URI: 'mongodb+srv://pnxbill:qHuEFIVvBzBwS3HK@cluster0.qmp4t.mongodb.net/congovid?retryWrites=true&w=majority',
  SESSION_SECRET: 'ds58_!5234s5ew'
}
