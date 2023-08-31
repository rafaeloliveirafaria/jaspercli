const model = require("./src/model");

const file = "dashboard_exportGroup";
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
model.jasperFile(file, type, params);
