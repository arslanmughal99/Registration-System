const express = require('express');
const imgUpload = require('express-fileupload');
const requestRoute = require('./routes/request');
const registerRoute = require('./routes/registration');
const route404 = require('./routes/route404');
const initMongoDB = require('./db/init');
const bodyParser = require('body-parser');
const compresion = require('compression');
const {loggerApi, globalLogger} = require('./logger/apiLogger');

// Starting server on specific PORT
///////////////////////////////// PORT FOR EACH SERVER 
let port = process.env.NODE_PORT;
let server;
(function serverDefination(){

if(port === '3000'){
    return server = 1;
}
if(port === '3001'){
    return server = 2;
}
if(port === '3002'){
    return server = 3;
}
if(port ==='3003'){
    return server = 4;
}
})();

console.log(server);
//////////////////////////////////////////// END PORT

///////////Catching any Global exception in Server//////////
process.on('uncaughtException', (err)=>{
    globalLogger.error(`Error Occur At Server ${server} Shutting Down`, err);
    process.exit(1);
});
//////////
process.on('unhandledRejection', (err)=>{
    globalLogger.error(`Error Occur At Server ${server} Shutting Down`, err);
    process.exit(1);
});
//////////////////////////////////// Catching Exception End 


////////////// Main Top Level App init ////////////////////
const app = express();
//initilizing mongoDB
initMongoDB();
// loggerInfo("App started");
loggerApi.info("App Started");


// Setting all nessasary middleware and 
// Templating engines
app.use(compresion());
app.set('view engine', 'pug');
app.set('views', __dirname + '/views');
app.use(imgUpload());
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use('/', requestRoute);
app.use('/register', registerRoute);
app.use('*', route404);
/////////////////////////////////////////////// End Main


////////// App Init Process /////////////
app.listen(port || 3000, ()=>{
    loggerApi.info(`Server ${server} Started at port ${port}`);
});
//////////////////////////////// End Init