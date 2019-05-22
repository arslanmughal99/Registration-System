# Online Registration System

##### For Colleges, Schools, Universities or any company



This system is sucessfully used this year and now i have made this public so that any one take benifit of this :)



### Setup:

first clone repository than cd into it and then type the follwing comand 

```bash
npm install  # This will install all dependencies from package.json
```



### Usage:

###### Setting up MonoDB:

Since i have used [mongoDB]([https://www.mongodb.com/](https://www.mongodb.com/) as Database so there fore there should be a local instance of mongoDB running on port `30270` or if you are using remote instance or differnt port change the connection string in `./db/init.js # on line 5` file respectivly .



#### Running Application:

Once mongoDB is up and running next step is you explicitly set a the port on which [express]([https://expressjs.com/](https://expressjs.com/) need to listen which can be set as enviromental variable which is `NODE_PORT` if no port is define than by default express will listen on port `3000` . The Follwoing command can be used to run on respective OS.

```bash
# On Linux
# Your port here
NODE_PORT=3002 node app.js
```

```bash
# On windows
# Your port here
set NODE_PORT=3002 node app.js
```

```bash
# if no port is define in env that express will run on port 3000
node app.js
```



###### Verify :)

if you have define a env port than open you browser and navigate to localhost:"YOUR PORT HERE" else just vist localhost:3000 and bammm you are done :)



### Logs:

By convention each event and error is logged, you can check logs in there respective `respective category`

what does it mean ? . Well i have seperated different tyes of logs to keep logs clean and readable .Now if you want you see API logs you which are offcourse related to (which are offcourse related to API) can check them in `/logs/ApiLogs.log` file also logs related to Clients are loged in `/logs/ClientLog.log` and all the other logs and Errors like `unhandled Promise Rejection etc` are loged in `logs/ApiGlobalExceptions.log` so you get the point :)



### Uploaded Images:

All the uploaded images are saved in `/images` folder .






