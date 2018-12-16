var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var PORT = process.env.PORT || 1704;
var app = express();
var userCtrl = require('./APICtrl/userCtrl');
var authenRepos = require('./repos/auth');
var authenCtrl = require('./APICtrl/authCtrl');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/user/', authenRepos.verifyAccessToken, userCtrl);
app.use('/api/auth/', authenCtrl)

app.use((req,res)=>{
    res.status(404).send({url: req.originalUrl + ' not found'})
});
app.listen(PORT, ()=>{
    console.log('Server running at port ' + PORT);
});