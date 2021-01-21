const { Pool, Client } = require('pg');
const db_config = require('../config/config.json').pg;

// pools will use environment variables
// for connection information
const pool = new Pool(db_config);

module.exports = {
    load(sql) {
        pool.query('sql', (error, results) => {
            if (error) {
              throw error
            }
            return results.rows;
        })
    },
}