const db = require("../utils/db");

module.exports = {
    async select_user(username) {
        const sql = `SELECT * FROM public."USER" WHERE username = '${username}'`;
        try {
            var result =  await db.load(sql);
            return result.rows[0];
        } catch(e) {
            console.log('Select user by username ' + e);
            return false;
        }
    },

    async select_user_by_email(email) {
        const sql = `SELECT * FROM public."USER" WHERE email = '${email}'`;
        try {
            var result = await db.load(sql);
            return result.rows[0];
        } catch(e) {
            console.log('Select user by email ' + e);
            return false;
        }
    },
    
    async insert_user(arr_value) {
        const arr_querry = `('${arr_value.username}', '${arr_value.email}', '${arr_value.password}', '${arr_value.fullname}', '${arr_value.dob}', '${arr_value.type}')`;
        try {
            var result = await db.add("USER", arr_querry);
            return true;
        } catch(e) {
            console.log(e);
            return false;
        }
    }
}