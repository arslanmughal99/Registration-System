const anuminc = require('alphanum-increment');
const StudentDB = require('../db/mongoSchema');
const {loggerApi} = require('../logger/apiLogger');



/////////////CREATE A UNIQUE inc ALPHA NUMERIC NUMBER/////////////
let alphaIncrementor = anuminc.increment;
let intIncrementor = anuminc.increment;
let finalIndex;
let incOptions = {
    digit: false,
    dashes: false
};


let incNumOptions = {
    alpha: false,
    dashes: false
};


async function lastIndexUpdate(res, bodyObj, callback){
    try{
        await StudentDB.find({}).sort({student_id: -1}).exec((err, docs)=>{
            if(err){
                res.status(500).send("Internal Server Error");
                loggerApi.error("Failed to Generate Student ID", err);
                return;
            }
            if(docs[0]){
             let lastIndex = docs[0].student_id;
             let alphaID = new Array(lastIndex.slice(0, 2))[0];
             let numericID = new Array(lastIndex.slice(2, 5))[0].toString();
             if (numericID.toString() === '999'){
                 alphaID = alphaIncrementor(alphaID, incOptions);
                 numericID = '000';
             }else{
                     numericID = intIncrementor(numericID, incNumOptions);
                 }
                 finalIndex = alphaID + numericID;
                 bodyObj.student_id = finalIndex;
                 callback(bodyObj)
            }else{
                bodyObj.student_id = 'aa000';
                callback(bodyObj)
            } 
         })
    }catch(err){
        res.status(500).send("Internal Server Error");
        loggerApi.error("Failed to Generate Student ID", err);
        return;
    }
  
}
///////////////////////////////////////// END ALPHANUMERIC

module.exports.lastIndexUpdate = lastIndexUpdate;