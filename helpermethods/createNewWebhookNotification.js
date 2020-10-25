const Sendgrid = require("../emails/Sendgrid");
const moment = require('moment');
const WebhookNotification = require('../models/WebhookNotification');

module.exports = (context, req, ThisIsATest)=>{
    console.log("createNewWebhookNotification called!")
    // let webhookNotification={}
    // if(req.body.webhook_type=="TRANSACTIONS"){
    //     let webhook_type = req.body.webhook_type;
    //     let webhook_code = req.body.webhook_code || null;
    //     let item_id = req.body.item_id || null;
    //     let error=req.body.error || null;
    //     let new_transactions=0;
    //     let removed_transactions = [ ];
    //     let date_created = moment().format();
    //     let metadata=JSON.stringify(req.body);
    
    //     if (webhook_code && req.body.webhook_code=="TRANSACTIONS_REMOVED"){
    //         removed_transactions = req.body.removed_transactions || null
    //     }else{
    //         new_transactions =req.body.new_transactions || null
    //     }
    
    //     webhookNotification = new WebhookNotification({
    //         webhook_type,webhook_code,item_id,error,new_transactions,removed_transactions,date_created,metadata
    //     })
    
    //     if (!ThisIsATest) {
    //         webhookNotification.save()
    //         context.log("webhookNotification Saved!")
    //     }
    // }else{
    //     let webhook_type = req.body.webhook_type;
    //     let webhook_code = req.body.webhook_code || null;
    //     let item_id = req.body.item_id || null;
    //     let error=req.body.error || null;
    //     let new_transactions=null;
    //     let removed_transactions = null;
    //     let date_created = moment().format();
    //     let metadata=JSON.stringify(req.body);
    
    //     webhookNotification = new WebhookNotification({
    //         webhook_type,webhook_code,item_id,error,new_transactions,removed_transactions,date_created,metadata
    //     })
    
    //     if (!ThisIsATest) {
    //         webhookNotification.save()
    //         context.log("webhookNotification Saved!")
    //     }
    //     //LAST SENDGRID email to send
    
    //     //Test locally by giving webhook_type != Transactions in request
    //     if (!ThisIsATest) {
    //         Sendgrid.send_NON_Transaction_Webhook_Email(context, req);
    //     }else{
    //         context.log("------------------------------------------")
    //         context.log("EMAIL NOT SENT DURING TEST WEBHOOK REQUESTS")
    //         context.log("------------------------------------------")
    //         console.log("------------------------------------------")
    //         console.log("EMAIL NOT SENT DURING TEST WEBHOOK REQUESTS")
    //         console.log("------------------------------------------")
    //     }
    // }

    
    // if (webhookNotification){
    //     return webhookNotification;
    // }else{
    //     return null
    // }
}