const Account = require('../models/Account');

module.exports = (context, req, response, ThisIsATest)=>{
    console.log("GetOrCreateAccount called")
    // return new Promise(async (resolve,reject)=>{


    // let new_accounts=[];
    // for(let i =0; i<response.data.accounts.length;i++){
    //     console.log("Console: account_id:",response.data.accounts[i].account_id);
    //     context.log("Context: account_id:",response.data.accounts[i].account_id);
    //     let account = await Account.find({account_id:response.data.accounts[i].account_id});
    //     if (account.length===0){
    //         console.log("Account NOT in DB")
    //         context.log("Account NOT in DB")

    //         account = new Account({
    //             item_id:req.body.item_id,
    //             account_id: response.data.accounts[i].account_id,
    //             name: response.data.accounts[i].name,
    //             official_name: response.data.accounts[i].official_name,
    //             available_balance: response.data.accounts[i].balances.available,
    //             current_balance: response.data.accounts[i].balances.current
    //         });
            
    //         if (!ThisIsATest) {
    //             account.save()
    //             new_accounts.push(account);
    //             console.log("account saved:", account)
    //             context.log("account saved:", account)
    //         }else{
    //             console.log("NEW account detected, but not saved on tests:", account)
    //             context.log("NEW account detected, but not saved on tests:", account)
    //         }
    //     }else{

    //         if (!ThisIsATest && account[0]) {
    //             account[0].current_balance=response.data.accounts[i].balances.current
    //             account[0].available_balance=response.data.accounts[i].balances.available
    //             account[0].save()
    //             new_accounts.push(account);
    //             console.log("UPDATED ACCOUNT IN DB")
    //             context.log("UPDATED ACCOUNT IN DB")
    //         }else{
    //             console.log("Accounts not updated on tests:", account)
    //             context.log("Accounts not updated on tests:", account)
    //         }

    //     }
    // }

    // resolve(new_accounts);

    // })

    
    
}