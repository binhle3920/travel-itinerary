const { Pool, Client } = require('pg');
const db_config = require('../config/config.json').pg;

// pools will use environment variables
// for connection information
const pool = new Pool(db_config);

module.exports = {
    select_user(username) {
        const q_user = `SELECT * FROM USER WHERE username = '${username}'`
        pool.query(q_user, (error, results) => {
            if (error) {
                throw error
            }
            return results.rows;
        })
    }, // return null -> user not exist

    select_email(email){
        const q_email = `SELECT * FROM USER WHERE email = '${email}'`
        pool.query(q_email, (error, results) => {
            if (error) {
                throw error
            }
            return results.rows;
        })
    }, // return null -> user not exist

    select_pass(username){
        const q_pass = `SELECT password FROM USER WHERE username = '${username}'`
        pool.query(q_pass, (error, results) => {
            if (error) {
                throw error
            }
            return results.rows;
        })
    },
}