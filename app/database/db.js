const config = require('config')
const mysql = require('promise-mysql')


const db_config = {
    host: config.database.host,
    user: config.database.user,
    password: config.database.password,
    database: config.database.databaseName,
    connectionLimit: 100
};

const pool = mysql.createPool(db_config);

module.exports= pool;