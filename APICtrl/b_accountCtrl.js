var router = require("express").Router();
var UserRepos = require('../repos/user');
var AuthRepos = require('../repos/auth');
var AccRepos = require('../repos/b_account');
const MONEY_TRANSACTION = 1100;
var moment = require('moment');

router.post('/accounts', (req, res)=>{
    var uid = req.token_payload.user.uid;
    if(uid) {
        AccRepos.getBankAccountsByUid(uid)
        .then(rows=>{
             console.log(rows);
             res.status(200).send(rows);
         })
        .catch(err =>{
            res.status(400).send(err);
        })
     }
});
router.post('/beneficiaries', (req, res)=>{
    var uid = req.token_payload.user.uid;
    if(uid) {
        AccRepos.getBeneficiaryByUid(uid)
        .then(rows=>{
             console.log(rows);
             res.status(200).send(rows);
         })
        .catch(err =>{
            res.status(400).send(err);
        })
     }
});

router.post('/addbeneficiary', (req, res)=>{
    var uid = req.token_payload.user.uid;
    var number_account = req.body.num;
    var ssname = req.body.sg_name;
    if(!ssname) {
        AccRepos.getNameByAccountNumber(number_account)
        .then(acc =>{
            if(acc) {
                ssname = (acc.name + " " + acc.first_name);
            }
            AccRepos.addBeneficiaryByUid(uid, ssname, number_account)
            .then(()=>{
                res.status(200).send("addnew beneficiary successfully");
            })
            .catch(err=>{
                console.log(err);
                res.status(400).send("addnew beneficiary failure !");
            }) 
        }).catch(err => console.log(err));
    }
   

});
router.post('/trans', (req, res) =>{
    var from = req.body.account_from;
    var to = req.body.account_to;
    var money =  parseInt(req.body.money);
    var note = req.body.note;
    var type_trans = req.body.type;
    if(!from || !to || !money || !(type_trans == 1 || type_trans == 0 )) {
        res.status(404).send('Transaction invalid, plz check again !');
    }
    Promise.all([AccRepos.getBankAccountsByNumber(from), AccRepos.getBankAccountsByNumber(to)])
    .then(values=>{
        var account_from;
        var account_to;
        if(values[0].account_number == from) {
             account_from = values[0];
             account_to = values[1];
        } else {
             account_from = values[1];
             account_to = values[0];
        }
        var balance_from = parseInt(account_from.balance);
        var balance_to = parseInt(account_to.balance);

        if(type_trans == 0 ){ // type == 0, account_form bị trừ phí 
            if(balance_from - money - MONEY_TRANSACTION > 0) {
                balance_from -= (money + MONEY_TRANSACTION);
                balance_to += money;
            }
        } else {
            if(balance_from - money > 0 ) {
                balance_from -= money;
                balance_to += (money - MONEY_TRANSACTION);
            }
        }
        var time =  moment().unix();
        Promise.all([AccRepos.updateBankAccount(account_from.account_number, balance_from),
            AccRepos.updateBankAccount(account_to.account_number, balance_to),
             AccRepos.addTransaction(account_from.account_number, account_to.account_number, money, time, note )])
        .then(()=>{
            res.status(200).send('Transaction successfully !');
        }).catch(err=>{
            console.log(err);
            res.status(400).send('Transaction failure !' + err);
        })
    })
    .catch(err=>{
        res.status(400).send('Transaction failure !' + err);
    })
});

router.post('/addnew', (req, res)=>{
    var uid = req.token_payload.user.uid;
    var num = req.body.account_number;
    if(uid) {
        AccRepos.addNewBankAccount(uid, num)
        .then(()=>{             
             res.status(200).send("addnew account successfully");
         })
        .catch(err =>{
            res.status(400).send(err);
        })
     }
});

router.post('/transhistory', (req, res)=>{
    var uid = req.token_payload.user.uid;
    AccRepos.getTransactionHistory(uid)
    .then(rows =>{
        res.status(200).send(rows);
    })
    .catch(err=>{
        res.status(404).send(err);
    })
    
});


router.post('/update_beneficiary', (req, res) => {
    var sgname = req.body.sg_name;
    var num = req.body.account_number;
    var uid = req.token_payload.user.uid;

    AccRepos.update_be(uid, sgname, num )
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

router.post('/check_bank_valid', (req, res) => {
    var num = req.body.account_number;
    AccRepos.getBankAccountsByNumber(num)
    .then(acc=>{
        if(acc) {
            res.status(200).send(JSON.stringify(acc)); 
        } else {
          res.status(402).send("An error occurred");
        }
    }).catch(err => {
        res.status(402).send("An error occurred");
    })
});
module.exports = router;