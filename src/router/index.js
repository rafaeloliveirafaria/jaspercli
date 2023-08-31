const router = require("express").Router();
const controller = require('../controller');

router.get('/export/file.xls', controller.get);

module.exports = router;