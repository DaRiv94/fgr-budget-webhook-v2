let User = require('./models/User')
let WebhookNotification = require('./models/WebhookNotification')
let Transaction = require('./models/Transaction')
let Sampleuser = require('./models/Sampleuser')
let CategoryTransaction = require('./models/CategoryTransaction')
let Category = require('./models/Category')
let Budget = require('./models/Budget')
let Bank = require('./models/Bank')
let Account = require('./models/Account')


clean_all_data()
console.log("DATA CLEANED")

async  function clean_all_data(){

    //Remove Sampleusers
    let Sampleuser_deleted = await deleteObjectData(Sampleuser,"Sampleuser")
    console.log("deleteObjectData Sampleuser results: ", Sampleuser_deleted)

    //Remove webhookNotifications
    let webhookNotification_deleted = await deleteObjectData(WebhookNotification,"webhookNotification")
    console.log("deleteObjectData webhookNotification results: ", webhookNotification_deleted)

    //Remove Transactions
    let transaction_deleted = await deleteObjectData(Transaction,"transaction")
    console.log("deleteObjectData transaction results: ", transaction_deleted)

    //Remove CategoryTransaction
    let categoryTransaction_deleted = await deleteObjectData(CategoryTransaction,"categoryTransaction")
    console.log("deleteObjectData CategoryTransaction results: ", categoryTransaction_deleted)
    
    //Remove Budget
    let budget_deleted = await deleteObjectData(Budget,"budget")
    console.log("deleteObjectData Budget results: ", budget_deleted)
    
    //Remove Category
    let category_deleted = await deleteObjectData(Category,"category")
    console.log("deleteObjectData Category results: ", category_deleted)
    
    //Remove Account
    let Account_deleted = await deleteObjectData(Account,"account")
    console.log("deleteObjectData Account results: ", Account_deleted)
    
    //Remove Bank
    let Bank_deleted = await deleteObjectData(Bank,"bank")
    console.log("deleteObjectData Bank results: ", Bank_deleted)
    
    //Remove User
    let User_deleted = await deleteObjectData(User,"User")
    console.log("deleteObjectData User results: ", User_deleted)
}


async function deleteObjectData(Model, model_name, destroy=true){

    try{
        let objects = await Model.findAll()
        // console.log(`${model_name +'s'}: `, objects)
        if(objects.length !== 0){
            objects_length = objects.length
            for(let i=0;i<objects_length;i++){
                console.log(`${model_name}: ${objects[i].id}`)
                    if(destroy){
                     await objects[i].destroy();
                    }
                    
            }
            console.log(`removed ${objects_length} ${model_name +'s'}`)
        }else{
            console.log(`No ${model_name +'s'} to remove`)
        }
        return true
    }catch(e){
        return false
    }
    
}