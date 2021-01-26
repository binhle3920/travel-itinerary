const db = require("../utils/db");

module.exports = {
    async select_user(username) {
        const sql = `SELECT * FROM public."USER" WHERE username = '${username}'`
        try {
            var result =  await db.load(sql);
            return result.rows[0];
        } catch(e) {
            console.log("Select user " + e);
            return false;
        }
    },

    async select_email(email) {
        const sql = `SELECT * FROM USER WHERE email = '${email}'`
        const [rows, fields] = await db.load(sql);
        if (rows.length === 0)
            return null;
        return rows[0];
    },

    async select_pass(username) {
        const sql = `SELECT password FROM USER WHERE username = '${username}'`
        const [rows, fields] = await db.load(sql);
        if (rows.length === 0)
            return null;
        return rows[0];
    },

    async insert_user(arr_value) {
        const arr_querry = `('${arr_value.username}', '${arr_value.email}', '${arr_value.password}', '${arr_value.fullname}', '${arr_value.dob}')`
        var result = await db.add("USER", arr_querry);
        return result;
    }
}