const express = require('express');
const router = express.Router();

//routes 
const tasks = require("./tasks.routes");
const files = require("./files.routes");
const responsible = require("./responsible.routes");

//Routes
router.use('', tasks);
router.use('', files);
router.use('', responsible);

module.exports = router;