const db = require("../utils/db");

module.exports = {
    //Tất cả thông tin của 1 địa điểm
    async select_diadiem(tenkhuvuc, id) {
        const sql = `SELECT "KHUVUC", "TENDD", "DIACHI", "SDT", "RATE", "DESCRIPTION", "TIMESUGGEST", "AVAILABLE", "TIMEOPEN", "TIMECLOSE"
        FROM public."DIADIEM" 
        WHERE "KHUVUC" = '${tenkhuvuc}' and "ID" = ${id}`;
        try {
            var result =  await db.load(sql);
            return result.rows[0];
        } catch(e) {
            console.log(e);
            return false;
        }
    },

    //Hình ảnh minh họa của 1 địa điểm
    async select_img(tendiadiem) {
        const sql = `SELECT "IMGLINK"
        FROM public."DIADIEM" D
        INNER JOIN public."IMAGE_DES" I
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

    //Tag của 1 địa điểm
    async select_tag(iddd) {
        const sql = `SELECT "TAG"
        FROM public."TAG" 
        WHERE "IDDD" = ${iddd}`;
        try {
            var result =  await db.load(sql);
            return result.rows;
        } catch(e) {
            console.log(e);
            return false;
        }
    },

    //Số lượng chuyến đi tại địa điểm này
    async select_slcd(tendiadiem) {
        const sql = `SELECT COUNT(*) SLCD FROM public."DETAILPLAN" DP
        INNER JOIN public."DIADIEM" DD
        ON DP."IDDD" = DD."ID"
        WHERE DD."TENDD" = '${tendiadiem}'`;
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

    //Update rate của 1 địa điểm, ratedd đã được tính toán  
    async update_ratedd(ratedd, tendiadiem) {
        const sql = `UPDATE public."DIADIEM" SET "RATE"= ${ratedd} WHERE "TENDD" = '${tendiadiem}'`
        try {
            var result =  await db.update(sql);
            return result.rows[0];
        } catch(e) {
            console.log(e);
            return false;
        }
    },

    //Select all image  
    async select_allimage(id) {
        const sql = `SELECT "IMGLINK"
        FROM public."IMAGE_DES" WHERE "IDDD" = ${id}`
        try {
            var result =  await db.update(sql);
            return result.rows;
        } catch(e) {
            console.log(e);
            return false;
        }
    },

    //Chọn tất cả từ bảng địa điểm
    async select_allkv() {
        const sql = `SELECT * FROM public."DIADIEM"`
        try {
            var result =  await db.load(sql);
            return result.rows;
        } catch(e) {
            console.log(e);
            return false;
        }
    },

    //Chọn địa điểm yêu thích
    async select_favplace(username) {
        const sql = `SELECT * from public."DIADIEM" C
        INNER JOIN public."FAVPLACE" D
        ON C."ID" = D."IDDD" 
        where D."username" = '${username}'`
        try {
            var result =  await db.load(sql);
            return result.rows;
        } catch(e) {
            console.log(e);
            return false;
        }
    },

    // chọn các địa điểm trong 1 khu vực
    async select_des_from_area(areaId){
        const sql = `SELECT "ID", "TENDD", B."IMGLINK"
                    from public."DIADIEM", 
                        (select *
                        from public."IMAGE_DES"
                        where "IMGLINK" in (select max("IMGLINK")
                                        from public."IMAGE_DES"
                                        group by "IDDD")) as B
                    where "KHUVUC" = '${areaId}' and "ID" = B."IDDD"
                    order by "ID"`
        try{
            var result = await db.load(sql);
            return result.rows;
        } catch(e){
            return false;
        }
    }
}