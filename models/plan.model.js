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
    }
}