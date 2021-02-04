const db = require("../utils/db");

module.exports = {
    // Danh sách các địa điểm tại 1 khu vực
    async select_alldiadiem(tenkhuvuc) {
        const sql = `SELECT "KHUVUC", "TENDD", "DIACHI", "SDT", "RATE", "DESCRIPTION", "TIMESUGGEST", "AVAILABLE", "TIMEOPEN", "TIMECLOSE"
        FROM public."DIADIEM" 
        WHERE "KHUVUC" = '${tenkhuvuc}'`;
        try {
            var result =  await db.load(sql);
            return result.rows[0];
        } catch(e) {
            console.log(e);
            return false;
        }
    },

    // Giới thiệu, rating
    async select_khuvuc(tenkhuvuc) {
        const sql = `SELECT "CODE", "NAME", "DESCRIPTION", "RATE" FROM public."KVLIST" WHERE "NAME" = '${tenkhuvuc}'`
        try {
            var result =  await db.load(sql);
            return result.rows[0];
        } catch(e) {
            console.log(e);
            return false;
        }
    },

    //Hình ảnh minh họa
    async select_khuvucimgs(tenkhuvuc) {
        const sql = `SELECT "IMGLINK"
        FROM public."IMGKV";
        WHERE "TENKV" = '${tenkhuvuc}'`
        try {
            var result =  await db.load(sql);
            return result.rows[0];
        } catch(e) {
            console.log(e);
            return false;
        }
    },

    // User rate và comment 1 khu vực
    async insert_ratekv(username, tenkhuvuc, kvrate, date, comment) {
        const arr_querry = `('${username}', ${tenkhuvuc}, '${kvrate}', '${date}', ${comment})`;
        try {
            var result =  await db.add('KHUVUCRATE', arr_querry);
            return result.rows[0];
        } catch(e) {
            console.log(e);
            return false;
        }
    },

    //Trả về tất cả các rate từ nhiều users của 1 khu vực
    async select_ratedd(tenkhuvuc) {
        const sql = `SELECT kvrate
        FROM public."KHUVUCRATE"
        WHERE "khuvuc" = '${tenkhuvuc}'`
        try {
            var result =  await db.load(sql);
            return result.rows[0];
        } catch(e) {
            console.log(e);
            return false;
        }
    },
    
    //Update rate của 1 khu vực, ratekv đã được tính toán  
    async update_ratedd(ratekv, tenkhuvuc) {
        const sql = `UPDATE public."KVLIST"
        SET "RATE"= ${ratekv}
        WHERE "NAME" = '${tenkhuvuc}'`
        try {
            var result =  await db.update(sql);
            return result.rows[0];
        } catch(e) {
            console.log(e);
            return false;
        }
    },

    //Chọn tất cả từ bảng khu vực
    async select_allkv() {
        const sql = `SELECT * FROM public."KVLIST"`
        try {
            var result =  await db.load(sql);
            return result.rows[0];
        } catch(e) {
            console.log(e);
            return false;
        }
    },
}