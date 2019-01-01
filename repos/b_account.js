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
        return DbFunction.getOne(`SELECT * FROM ${tableName} WHERE account_number = '${num}'`)
    }
    getNameByAccountNumber(num) {
        return DbFunction.getOne(`SELECT name, first_name FROM ${tableName} as b,
         ${userTalbe} as u WHERE u.uid = b.uid and b.account_number = '${num}'`);
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
        var sql = `SELECT t.account_send, t.account_recieve, t.number_money, t.note, t.time from ${tableName} as b, ${tranactionTable} as t WHERE
         (b.account_number = t.account_send or b.account_number = t.account_recieve)
        and b.uid = ${uid}`;

        return DbFunction.load(sql);
    }
    update_be(uid, name, num) {
        var sql = `UPDATE ${beneficiaryTable} SET suggested_name = '${name}' WHERE account_number = ${num} 
        and uid = ${uid}`;
        console.log(sql);
        return DbFunction.insert(sql);
    }
    
}



module.exports = new AccountRepos();