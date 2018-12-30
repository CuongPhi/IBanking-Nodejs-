var router = require("express").Router();
var UserRepos = require('../repos/user');
var AuthRepos = require('../repos/auth');
var AccRepos = require('../repos/b_account');

router.post('/auth', (req, res)=>{
    res.status(200).send({
        msg : 'verify ok !'
    });
})


router.post('/addnew', (req, res)=>{
    var user_type = req.token_payload.user.user_type;
    if(user_type != 1 ) {
        res.status(403).json('Access denied !');
    }
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
        })
        
    }
})

router.post('/profile', (req, res) => {
    var uid = req.token_payload.user.uid;
    UserRepos.getById(uid)
    .then(user=>{
        if(user) {
            res.status(200).send(JSON.stringify(user));
        } else {
            res.status(403).send("An error occurred");    
        }
        
    })
    .catch(err => {
        res.status(402).send("An error occurred");
    })
});

router.post('/update', (req, res) => {
    var uid = req.token_payload.user.uid;
    var email = req.body.email;
    var f_name = req.body.first_name;
    var name = req.body.name;
    var address = req.body.address;
    var about = req.body.about_me;
    var phone = req.body.phone;

    UserRepos.updateUser(uid, email, phone, f_name, name, address, about )
    .then((user)=>{
          if(user) {
            res.status(200).send(JSON.stringify(user)); 
          } else {
            res.status(402).send("An error occurred");
          }
    })
    .catch(err => {
        res.status(402).send("An error occurred");
    })
});

module.exports = router;