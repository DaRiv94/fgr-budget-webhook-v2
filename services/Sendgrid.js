//BRING IN SENDGRID SERVICE PRIvateKEY
//Bring in 
const axios = require('axios');
const EMAIL_SERVICE_URL = process.env.EMAIL_SERVICE_URL
const TO_EMAIL = process.env.TO_EMAIL


class Sendgrid{

    ///Send the new transactions in email
    // Test: delete existing transactions within 10 days and hit webhook again 
     static async send_New_Transactions_EMAIL(req, new_transactions, to_email=TO_EMAIL, subject='New Transactions' ){
            const  newTransactionsEmailTemplate = await require('./html_templates/newTransactionsEmailTemplate')(req,new_transactions)
            console.log("newTransactionsEmailTemplate: ",newTransactionsEmailTemplate)
            const email_message_data = {
                to_email:to_email,
                subject:subject,
                fallback_text:"Could not show newTransactionsEmailTemplate in this email client",
                html:newTransactionsEmailTemplate
                };
            try{
                console.log("send_New_Transactions_EMAIL CALLED")
                console.log(`EMAIL_SERVICE_URL + '/notification': ${EMAIL_SERVICE_URL} + '/notification'`)
                let response = await axios.post(EMAIL_SERVICE_URL + '/notification', email_message_data);
                //could error check to see if response.status == '200', But I am not using the response for this at the moment
                return response;
            }catch(ex){
                console.log("Error: ", JSON.stringify(ex))
            }
    }
    //Test locally by deleting a new transaction from db and using a bad item_id in request
    static send_Error_Notification_Email(req, error, subject='Error Notification', to_email=TO_EMAIL){
            console.log("send_Error_Notification_Email CALLED")
    }

    //Test locally by giving webhook_type != Transactions in request
    static send_NON_Transaction_Default_updated_Webhook_Email(context, req, subject='Non-Transaction Webhook',
    to_email='dariv94@gmail.com', 
    from_email='frankgriviera@outlook.com',
    text=' Default text' ){
        console.log("send_NON_Transaction_Default_updated_Webhook_Email CALLED")
    }
}
module.exports=Sendgrid;