const Transaction = require('../models/Transaction');
const {getAccountById } = require('./repositoryMethods');

module.exports= (response, ThisIsATest)=>{
    return new Promise(async (resolve,reject)=>{

        let new_transactions=[]
        for(let i =0; i<response.data.transactions.length;i++){
            // console.log("transaction_id:",response.data.transactions[i].transaction_id);

            let transaction = await Transaction.findOne({ where: {transaction_id:response.data.transactions[i].transaction_id} });
            if (transaction === null){
                console.log("Transaction NOT in DB")
                

                let categories = []
                for(let j =0;j<response.data.transactions[i].category.length;j++){
                    categories.push(response.data.transactions[i].category[j]);
                }
                let account = await getAccountById(response.data.transactions[i].account_id)
                transaction = await Transaction.build({
                    account_id: response.data.transactions[i].account_id,
                    amount:response.data.transactions[i].amount,
                    name: response.data.transactions[i].name,
                    category_id:response.data.transactions[i].category_id,
                    date:response.data.transactions[i].date,
                    pending:response.data.transactions[i].pending,
                    transaction_id:response.data.transactions[i].transaction_id,
                    transaction_type:response.data.transactions[i].transaction_type,
                    user_id: account.user_id          
                });

                if (!ThisIsATest) {
                    transaction.save();
                    // console.log("transaction saved:", transaction.dataValues)
                    // console.log("transaction saved:", transaction)
                }else{
                    console.log("NEW transaction detected, but not saved on tests:", transaction.dataValues)
                }
                //add to new transaction list
                new_transactions.push(transaction);
                
            }else{
                console.log("TRANSACTION IN DB ALREADY")
            }
        }
        resolve(new_transactions);
    })
}