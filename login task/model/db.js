const Pool = require('pg').Pool;

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "user_details",
    password: "password",
    port: 5432,

});

module.exports = pool;