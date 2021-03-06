const WebhookNotification = require('../models/WebhookNotification');

module.exports = async ( req, ThisIsATest)=>{

    let webhookNotification={}
    let webhook_type = req.body.webhook_type;
    let webhook_code = req.body.webhook_code || null;
    let item_id = req.body.item_id || null;
    let error=req.body.error || null;
    let new_transactions=req.body.new_transactions || null;
    let metadata=JSON.stringify(req.body);

    try{
        webhookNotification = await WebhookNotification.build({
            webhook_type,webhook_code,item_id,error,new_transactions,metadata
        });

        if (!ThisIsATest) {
            webhookNotification.save()
            console.log("webhookNotification Saved!")
        }else{
            console.log("webhookNotification NOT Saved During Tests")
        }
        return webhookNotification
    }catch(e){
        console.log("Error in createNewWebhookNotification",e)
        return {error:e}
    }

}