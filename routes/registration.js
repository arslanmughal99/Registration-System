const Joi = require('joi');
const {saveToMongo} = require('../db/saveToDB');
const StudentDB = require('../db/mongoSchema');
const express = require('express');
const joiSchema = require('../validator/reqValidator');
const {uploadImg} = require('../imageUpload/upload_images');
const {loggerClient} = require('../logger/clientLogger');



const router = express.Router();
router.post('/', (req, res)=>{
   let body = req.body;
   let clientIp = req.header('x-forwarded-for');
   let validationResult = Joi.validate(body, joiSchema);        
   if (validationResult.error){                 // First validate data with joi
        loggerClient.error(`${clientIp} : Submition Failed Due To Joi Validation`, validationResult.error);
       res.status(400).render('clienterrorjoi');
       return;                                  //stop if invalid data provided
   }else{
        StudentDB.findOne({request_id : body.request_id}, (err, doc)=>{ // find if doc already exist
            if(err){
                loggerClient.error(`${clientIp} : Submition Failed Due To mongoDB existing Search`);
                res.status(500).send("Some thing Went Worng Try Agian latter");
                return ;                        // will handle this error latter
            }
            if(doc){  // check if doc already exist
                loggerClient.error(`${clientIp} : Submition Failed Due To duplicate request_id`);
                res.status(500).render('clienterrorDuplicateEntry');
                return;
            }else{ 
                if(req.files.Imgfile){          // upload img to server
                        uploadImg(req, res);
                }else{
                    res.status(400).render('clienterror');
                    loggerClient.error(`${clientIp} : Submition Failed Due To no Image provided`);
                    return;
                }
                    saveToMongo(req, res, body);      // insert data to mongoDB
                    
                    res.status(200).render('success');
            } 
        });   
       }
    });



module.exports = router;