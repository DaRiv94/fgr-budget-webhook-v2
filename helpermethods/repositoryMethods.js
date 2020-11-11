const Account = require('../models/Account');
const Bank = require('../models/Bank');

exports.getAccountById = async function(account_id){
    return account = await Account.findOne({ where: { account_id: account_id } });
} 

exports.getBankByItemId = async function(item_id){
    return bank = await Bank.findOne({ where: { item_id: item_id } });
} 