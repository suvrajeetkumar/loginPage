const express = require('express');
var bodyParser = require('body-parser');
const routes = require('./routes/api');


//set up express app
const app = express();

//bodyparser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());



app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
  
    next();
  });

app.use(routes);





app.listen(process.env.port || 4000,function(){
    console.log("listening to port 4000");
});