var jwt = require('jsonwebtoken');
var rndToken = require('rand-token');
var moment = require('moment');

var DbFunction = require('../db-fn/mysql-db');

const SECRET = 'ABCDEF';
const AC_LIFETIME = 120; // seconds

class AuthRepos {
    generateAccessToken(userEntity) {
        var payload = {
            user: userEntity,
            info: 'more info'
        }
        var token = jwt.sign(payload, SECRET, {
            expiresIn: AC_LIFETIME
        });
        return token;
    }

    verifyAccessToken(req, res, next) {
        var token = req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, SECRET, (err, payload) => {
                if (err) {
                    res.statusCode = 405;
                    res.json({
                        msg: 'INVALID TOKEN',
                        error: err
                    })
                } else {
                    req.token_payload = payload;
                    next();
                }
            });
        } else {
            res.statusCode = 403;
            res.json({
                msg: 'NO_TOKEN'
            });
        }
    }

    generateRefreshToken() {
        const SIZE = 80;
        return rndToken.generate(SIZE);
    }

    updateRefreshToken (userId, rfToken)  {  
        var sql = `Update user set rfToken = '${rfToken}' where uid = ${userId}`;           
        return DbFunction.insert(sql);   
    }
}

module.exports = new AuthRepos();