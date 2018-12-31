var DbFunction = require('../db-fn/mysql-db');
const tableName = 'bank_account';
const beneficiaryTable = 'beneficiary';
const tranactionTable = 'transaction';
const userTalbe = 'user';
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
        return DbFunction.load(sql);
    }
    addBeneficiaryByUid(uid, name, num ) {
        var sql = `INSERT INTO ${beneficiaryTable} 
        (uid, suggested_name, account_number) VALUES 
        (${uid}, '${name}' , ${num})`;
        return DbFunction.insert(sql);
    }
    addTransaction(acc_num_send, acc_num_recieve, money, time, note) {
        var sql = `INSERT INTO ${tranactionTable} 
        (account_send, account_recieve, number_money, time, note) VALUES 
        (${acc_num_send} , ${acc_num_recieve}, ${money}, ${time}, '${note}')`;
        return DbFunction.insert(sql);
    }

    getTransactionHistory(uid) {
        var sql = `SELECT distinct t.account_send, t.account_recieve, t.number_money, t.note, t.time from ${tableName} as b, ${tranactionTable} as t WHERE
         (b.account_number = t.account_send or b.account_number = t.account_recieve)
        and b.uid = ${uid}`;

        return DbFunction.load(sql);
    }
    getAllAccountNumber(uid) {
        var sql = `SELECT account_number from ${tableName} where uid = ${uid}`;
        return DbFunction.load(sql);
    }
}



module.exports = new AccountRepos();