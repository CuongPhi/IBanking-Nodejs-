var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 1704;
var app = express();
var db = require('./db-fn/mysql-db');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.loadOne('select * from user')
.then(rows => {
    console.log(rows);
})
.catch(err => {
    console.log(err);
    console.log('ee')
});








app.use((req,res)=>{
    res.status(404).send({url: req.originalUrl + ' not found'})
});
app.listen(PORT, ()=>{
    console.log('Server running at port ' + PORT);
});