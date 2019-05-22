const {loggerClient} = require('../logger/clientLogger');
const {loggerApi} = require('../logger/apiLogger');
function imgUpload(req, res){
    let clientIp = req.header('x-forwarded-for');
    let imgFile = req.files.Imgfile;
    imgFile.mv('./images/'+ req.body.request_id + '.png' , (err)=>{
        if (err){
            res.status(500).render('errorInternal');
            loggerApi.error(`Submition Failed Due To Bad image Processing : ${clientIp}`);
            return;
        }
    })
    loggerClient.info(`${clientIp} : Image Uploaded Sucessfully`);
}

module.exports.uploadImg = imgUpload;