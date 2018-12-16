var router = require("express").Router();
var UserRepos = require('../repos/user');
var AuthRepos = require('../repos/auth');

router.post('/auth', (req, res)=>{
    res.status(200).send({
        msg : 'verify ok !'
    });
})

router.post('/accounts', (req, res)=>{
    
});

router.post('/addnew', (req, res)=>{
    var username = req.body.username;
    var password = req.body.password;
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    if(!username || !password) {
        res.status(400).json("invalid username or password");
    } else {
        UserRepos.getByUserName(username)
        .then(user =>{
            if(!user) {
                UserRepos.addNewUser(username, password,"", name, email, phone, 0)
                .then(()=>{                    
                        res.status(200).send({
                            msg : "OK",
                        });   
                }).catch(err => {
                   res.status(404).send({
                       msg : "not found",
                   });
                });
            }
            else {
                res.status(400).send({
                    msg : "user name is exist",
                });
            }
        }).catch(err=>{
            console.log(err);
        })
        
    }
})

module.exports = router;