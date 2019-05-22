const express = require("express");
const router = express.Router();
const crypto = require('crypto');
const {loggerClient} = require('../logger/clientLogger');


// Generate New Unique Random ID for Each new Form request
function uniqueID(){
    let hexStr = crypto.randomBytes(16).toString('hex');
    return hexStr;
}

// listen for form request
router.get('/', function(req, res){
    let pubIp = req.header('x-forwarded-for');
    let userAgent = req.header('user-agent');
    loggerClient.info(`${pubIp} : ${userAgent}`);
    res.render('index', {request_id_number: uniqueID()});
});







// exporting router fo external use in main app
module.exports = router;