const db = require("../utils/db");

module.exports = {
    async select_allplan() {
        const sql = `SELECT *
        FROM public."PLAN"`
        try {
            var result =  await db.load(sql);
            return result.rows;
        } catch(e) {
            console.log(e);
            return false;
        }
    },
    async select_allplanofuser(username) {
        const sql = `SELECT * from public."DIADIEM" C
        INNER JOIN public."PLAN" D
        ON C."ID" = D."ID" 
        where D."USERNAME" = '${username}'`
        try {
            var result =  await db.load(sql);
            return result.rows;
        } catch(e) {
            console.log(e);
            return false;
        }
    },
    async select_planforindex() {
        const sql = `SELECT *
        FROM public."PLAN"
        limit 6`
        try {
            var result =  await db.load(sql);
            return result.rows;
        } catch(e) {
            console.log(e);
            return false;
        }
    },
}