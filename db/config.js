require('dotenv').config()
console.log("IN CONFIG>JS")
module.exports = {
    development: {
        username: process.env.LOCAL_DB_USERNAME,
        password: process.env.LOCAL_DB_PASSWORD,
        database: process.env.LOCAL_DB,
        host: process.env.LOCAL_DB_HOST,
        port: process.env.LOCAL_DB_PORT,
        dialect: 'postgres'
    },
    sandbox: {
        username: process.env.LOCAL_DB_USERNAME,
        password: process.env.LOCAL_DB_PASSWORD,
        database: process.env.LOCAL_DB,
        host: process.env.LOCAL_DB_HOST,
        port: process.env.LOCAL_DB_PORT,
        dialect: 'postgres'
    }
  };