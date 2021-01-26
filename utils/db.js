const { Pool, Client } = require('pg');
const db_config = require('../config/config.json').pg;

// pools will use environment variables
// for connection information
const pool = new Pool(db_config);

module.exports = {
    load(sql) {
        return pool.query(sql);
    }, 

    add(table_name, arr_value){
        const sql = `INSERT INTO public."${table_name}" VALUES ${arr_value};`
        console.log(sql);
        pool.query(sql, (error, results) => {
            if (error) {
                console.log("Error in db: " + error);
                return false;
            }
            return new Promise((resolve,reject) => {
                resolve(true);
            });
        })
    }
}