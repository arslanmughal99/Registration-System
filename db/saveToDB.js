const StudentDB = require('../db/mongoSchema');
const {loggerClient} = require('../logger/clientLogger');
const {lastIndexUpdate} = require('../alphanum/alphanuminc');
const {exec} = require('child_process');


// validate and save data to mongoDB async
function saveToDB(req, res, body){
    let clientIp = req.header('x-forwarded-for');
    lastIndexUpdate(res, body, (bodyObj)=>{
        let newStudent = new StudentDB(bodyObj);
        newStudent.save((err)=>{
            if(err){
            exec(`rm ../images/${bodyObj.request_id}.png`)
            loggerClient.error(`${clientIp} : Failed to save data in MongoDB`, err)
            // res.status(500).render('clienterrorjoi');
            return;
            }else{
            loggerClient.info(`${clientIp} : Sucessfully saved data to MongoDB`);
            loggerClient.info(`${clientIp} : Sucessfully Submited`);
            }
        });    
    });
}


module.exports.saveToMongo = saveToDB;