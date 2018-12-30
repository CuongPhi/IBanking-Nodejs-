var DbFunction = require('../db-fn/mysql-db');
const tableName = 'user';
/**
 * user type
 *  0 Location Identifier
 *  1 Request Management 
 *  2 Driver
 */
class UserRepos {
    changPassword(username, newpassword) {
        return DbFunction.runQuery(`UPDATE ${tableName} SET password = '${newpassword}' WHERE username = '${username}'`);
    }

    login(username, password, type) {
        return DbFunction.getOne(`SELECT * FROM ${tableName}  WHERE username = '${username}' AND password = '${password}' AND user_type = ${type}`);
    }
    getByToken(username, token){
        var sql = `SELECT * FROM ${tableName}  WHERE username = '${username}' AND rfToken = '${token}'`;
         return DbFunction.getOne(sql);
    }

    getById(uid) {
        return DbFunction.getOne(`SELECT * FROM ${tableName} WHERE uid = ${uid}`)
    }
    getByUserName(username) {
        return DbFunction.getOne(`SELECT * FROM ${tableName} WHERE username = '${username}'`);
    }
    getAll() {
        return DbFunction.getAll(`SELECT * FROM  ${tableName}`);
    }
    addNewUser(username, password, rfToken, name, email, phone, user_type) {
        var sql = `INSERT INTO ${tableName} 
        (username, password, rfToken, name, email, phone, user_type) VALUES 
        ('${username}', '${password}', '${rfToken}', '${name}', '${email}', '${phone}', ${user_type})`;
        return DbFunction.insert(sql);
    }
    updateUser(uid, email, phone, firstname, lastname, address, about) {
        var sql = `UPDATE ${tableName} SET name = '${lastname}', phone = '${phone}', email = '${email}', 
        first_name = '${firstname}', address = '${address}', about_me = '${about}' WHERE uid = ${uid}`;    
            console.log(sql);

        return DbFunction.insert(sql);
    }
}



module.exports = new UserRepos();