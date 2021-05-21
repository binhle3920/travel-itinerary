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

    async select_top_plan(){
        const sql = `SELECT *
                    FROM public."PLAN"
                    order by "REVIEW" DESC
                    limit 6`
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

    async select_plan(plan_id){
        const sql = `SELECT * FROM public."PLAN" WHERE public."PLAN"."ID" = '${plan_id}' `
        try{
            var result = await db.load(sql);
            return result.rows[0];
        } catch(e) {
            return false;
        }
    },

    async select_detailplan(plan_id, day){
        const sql = `select E.*, D."TENDD", B."IMGLINK"
                    from public."PLANEVENT" E, public."DIADIEM" D,
                        (select *
                        from public."IMAGE_DES"
                        where "IMGLINK" in (select max("IMGLINK")
                                            from public."IMAGE_DES"
                                            group by "IDDD")) as B
                    where E."IDDD" = D."ID" and E."IDDD" = B."IDDD" and E."IDPLAN" = '${plan_id}' and E."DAYTH" = '${day}'
                    order by E."TIMESTART"`
        try{
            var result = await db.load(sql);
            return result.rows;
        } catch(e){
            return false;
        }
    }
}