const { jasperStream } = require('../model');
module.exports = {
    async get (req, res, next){
        try {
            
            const host = ''
            const user = '' 
            const pass = ''
            
            const file = "/jasperserver/rest_v2/reports/reports/dashboard_exportGroup";
            const type = "xls";
            const params = {
                ignorePagination: true,
                onePagePerSheet: false,
                p_store_id: "93",
                p_team_id: "",
                p_user_id: "",
                dateB: "2023-08-01",
                dateD: "2023-08-31",
            };
            // if(req.query.type){
            //     const toJson = JSON.parse(req.query.param)
            //     return await jasperStream(req.query.report, req.query.type, toJson, res)
            // }
            return await jasperStream(host, user, pass, file, type, params, res)
            // throw new Error("not_found")
        } catch (error) {
            next(error);
        }
    }
}