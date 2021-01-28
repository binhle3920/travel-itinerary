const db = require("../utils/db");

module.exports = {
    //Tất cả thông tin của 1 địa điểm
    async select_diadiem(tendiadiem) {
        const sql = `SELECT "KHUVUC", "TENDD", "DIACHI", "SDT", "RATE", "DESCRIPTION", "TIMESUGGEST", "AVAILABLE", "TIMEOPEN", "TIMECLOSE","IMGLINK"
        FROM public."DIADIEM" D
        INNER JOIN public."IMG" I
        ON D."ID" = I."IDDD" 
        WHERE "TENDD" = '${tendiadiem}'`;
        try {
            var result =  await db.load(sql);
            return result.rows[0];
        } catch(e) {
            console.log(e);
            return false;
        }
    },

    //User rate và comment 1 địa điểm
    async insert_rate(username, iddd, comment, date, personrate) {
        const arr_querry = `('${username}', ${iddd}, '${comment}', '${date}', ${personrate})`;
        try {
            var result =  await db.add('COMMENT', arr_querry);
            return result.rows[0];
        } catch(e) {
            console.log(e);
            return false;
        }
    },

    //Trả về tất cả các rate từ nhiều users của 1 địa điểm 
    async select_ratedd(tendiadiem) {
        const sql = `SELECT personrate from public."COMMENT" C
        INNER JOIN public."DIADIEM" D
        ON C."IDDD" = D."ID" 
        where D."TENDD" = '${tendiadiem}'`
        try {
            var result =  await db.load(sql);
            return result.rows[0];
        } catch(e) {
            console.log(e);
            return false;
        }
    },

    //Update rate của 1 địa điểm, ratedd được tính toán các kiểu 
    async update_ratedd(ratedd, tendiadiem) {
        const sql = `UPDATE public."DIADIEM" SET "RATE"= ${ratedd} WHERE "TENDD" = '${tendiadiem}'`
        try {
            var result =  await db.load(sql);
            return result.rows[0];
        } catch(e) {
            console.log(e);
            return false;
        }
    },



}