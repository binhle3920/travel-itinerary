const db = require("../utils/db");

module.exports = {
    // Check username
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

    // Check email
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
    
    // Thêm 1 user
    async insert_user(arr_value) {
        const arr_querry = `('${arr_value.username}', '${arr_value.email}', '${arr_value.password}', '${arr_value.fullname}', '${arr_value.dob}', '${arr_value.type}', '${arr_value.google}')`;
        try {
            var result = await db.add("USER", arr_querry);
            return true;
        } catch(e) {
            console.log(e);
            return false;
        }
    },

    // Update new password
    async update_password(username, newpass) {
        const sql = `UPDATE public."USER" SET "password"= '${newpass}' WHERE "username" = '${username}'`
        try {
            var result =  await db.update(sql);
            return result.rows[0];
        } catch(e) {
            console.log(e);
            return false;
        }
    },

    // Update new fullname
    async update_fullname(username, newfullname) {
        const sql = `UPDATE public."USER" SET "fullname"= '${newfullname}' WHERE "username" = '${username}'`
        try {
            var result =  await db.update(sql);
            return result.rows[0];
        } catch(e) {
            console.log(e);
            return false;
        }
    },

    // Update new dob
    async update_dob(username, newdob) {
        const sql = `UPDATE public."USER" SET "dob"= '${newdob}' WHERE "username" = '${username}'`
        try {
            var result =  await db.update(sql);
            return result.rows[0];
        } catch(e) {
            console.log(e);
            return false;
        }
    },

    // Update new email
    async update_email(username, newemail) {
        const sql = `UPDATE public."USER" SET "email"= '${newemail}' WHERE "username" = '${username}'`
        try {
            var result =  await db.update(sql);
            return result.rows[0];
        } catch(e) {
            console.log(e);
            return false;
        }
    },

     // Get all users
    async select_user() {
        const sql = `SELECT * FROM public."USER"'`;
        try {
            var result =  await db.load(sql);
            return result.rows;
        } catch(e) {
            console.log('Select user by username ' + e);
            return false;
        }
    },
}