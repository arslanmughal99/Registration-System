const mongooose = require('mongoose');
const {loggerApi} = require('../logger/apiLogger');

function ConnectToMongo(){
    mongooose.connect('mongodb://localhost:30270/FormsDetails', {useNewUrlParser:true})
    // mongooose.connect('mongodb://localhost:27017/FormsDetails', {useNewUrlParser:true})
    .then(()=>{
        loggerApi.info("MongoDB initi sucessfully");
    })
    .catch((err)=>{
        loggerApi.error(`Fail to init MongoDB ${err.message}`, err);
        process.exit(1);
    });
}


module.exports = ConnectToMongo;