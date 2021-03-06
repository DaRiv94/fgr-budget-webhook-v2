const Sequelize = require('sequelize')
console.log("hello process.env.DATABASE_URL",process.env.DATABASE_URL)
//Postgres DB
const db = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres'
  })

db
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = db