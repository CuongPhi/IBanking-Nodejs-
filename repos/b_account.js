var DbFunction = require('../db-fn/mysql-db');
const tableName = 'bank_account';
const beneficiaryTable = 'beneficiary';
/**
 * user type
 *  0 Location Identifier
 *  1 Request Management 
 *  2 Driver
 */
class AccountRepos {
    
    getBankAccountsByUid(uid) {
        return DbFunction.load(`SELECT * FROM ${tableName} WHERE uid = ${uid}`)
    }
    getBankAccountsByNumber(num) {
        return DbFunction.getOne(`SELECT * FROM ${tableName} WHERE account_number = ${num}`)
    }
    addNewBankAccount(uid, num) {
        var sql = `INSERT INTO ${tableName} 
        (uid, balance, account_number) VALUES 
        (${uid}, 0 , ${num})`;
        return DbFunction.insert(sql);
    }
    updateBankAccount(num, balance) {
        var sql = `UPDATE ${tableName} SET balance = ${balance} WHERE account_number = ${num}`;
        return DbFunction.insert(sql);
    }
    getBeneficiaryByUid(uid) {
        var sql = `SELECT * FROM ${beneficiaryTable} WHERE uid = ${uid}`;
        return DbFunction.getOne(sql);
    }
    addBeneficiaryByUid(uid, name, num ) {
        var sql = `INSERT INTO ${beneficiaryTable} 
        (uid, suggested_name, account_number) VALUES 
        (${uid}, '${name}' , ${num})`;
        return DbFunction.insert(sql);

    }
}



module.exports = new AccountRepos();