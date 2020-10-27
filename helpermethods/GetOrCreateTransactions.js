const Transaction = require('../models/Transaction');

module.exports= (context, response, ThisIsATest)=>{
    console.log("GetOrCreateTransaction Called")
    return [{"transaction":true}]
    // return new Promise(async (resolve,reject)=>{

    //     //{ "date": {$gt: new Date('2019-11-20')} } use this to filter in mongodb compass to find transaction near current date and remove to test this functionality.
    //     let new_transactions=[]
    //     for(let i =0; i<response.data.transactions.length;i++){
    //         console.log("transaction_id:",response.data.transactions[i].transaction_id);
    //         context.log("transaction_id:",response.data.transactions[i].transaction_id);

    //         let transaction = await Transaction.find({transaction_id:response.data.transactions[i].transaction_id});
    //         if (transaction.length===0){
    //             console.log("Transaction NOT in DB")
    //             context.log("Transaction NOT in DB")

    //             let categories = []
    //             for(let j =0;j<response.data.transactions[i].category.length;j++){
    //                 categories.push(response.data.transactions[i].category[j]);
    //             }

    //             transaction= new Transaction({
    //                 account_id: response.data.transactions[i].account_id,
    //                 amount:response.data.transactions[i].amount,
    //                 name: response.data.transactions[i].name,
    //                 category:categories,
    //                 category_id:response.data.transactions[i].category_id,
    //                 date:response.data.transactions[i].date,
    //                 pending:response.data.transactions[i].pending,
    //                 pending_transaction_id:response.data.transactions[i].pending_transaction_id,
    //                 transaction_id:response.data.transactions[i].transaction_id,
    //                 transaction_type:response.data.transactions[i].transaction_type
    //             });

    //             if (!ThisIsATest) {
    //                 transaction.save();
    //                 console.log("transaction saved:", transaction)
    //                 context.log("transaction saved:", transaction)
    //             }else{
    //                 console.log("NEW transaction detected, but not saved on tests:", transaction)
    //                 context.log("NEW transaction detected, but not saved on tests:", transaction)
    //             }
    //             //add to new transaction list
    //             new_transactions.push(transaction);
                
    //         }else{
    //             console.log("TRANSACTION IN DB ALREADY")
    //             context.log("TRANSACTION IN DB ALREADY")
    //         }
    //     }

    //     resolve(new_transactions);

    // })



}