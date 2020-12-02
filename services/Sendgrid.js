const axios = require('axios');

const EMAIL_SERVICE_URL = process.env.EMAIL_SERVICE_URL
const TO_EMAIL = process.env.TO_EMAIL


class Sendgrid{

    ///Send the new transactions in email
    // Test: delete existing transactions within 10 days and hit webhook again 
     static async send_New_Transactions_EMAIL(req, new_transactions, to_email, subject='New Transactions' ){

            if(to_email==null){
                if(TO_EMAIL==null){
                    console.log("NO DEFAULT EMAIL SET FOR ENV VAR: TO_EMAIL")
                    return "NO DEFAULT EMAIL SET FOR ENV VAR: TO_EMAIL";
                }
                to_email = TO_EMAIL
            }

            if(EMAIL_SERVICE_URL == null){
                console.log("NO DEFAULT EMAIL SET FOR ENV VAR: TO_EMAIL")
                return "NO DEFAULT EMAIL SET FOR ENV VAR: TO_EMAIL";
            }

            const  newTransactionsEmailTemplate = await require('./html_templates/newTransactionsEmailTemplate')(req,new_transactions)
            // console.log("newTransactionsEmailTemplate: ",newTransactionsEmailTemplate)
            const email_message_data = {
                to_email:to_email,
                subject:subject,
                fallback_text:"Could not show newTransactionsEmailTemplate in this email client",
                html:newTransactionsEmailTemplate
                };
            try{
                let response = await axios.post(EMAIL_SERVICE_URL + '/notification', email_message_data);
                //could error check to see if response.status == '200', But I am not using the response for this at the moment
                return response;
            }catch(ex){
                console.log("Error: ", JSON.stringify(ex))
            }
    }
    //Test locally by deleting a new transaction from db and using a bad item_id in request
    static async send_Error_Notification_Email(req, error, subject='Error Notification', to_email){

        if(to_email==null){
            if(TO_EMAIL==null){
                console.log("NO DEFAULT EMAIL SET FOR ENV VAR: TO_EMAIL")
                return "NO DEFAULT EMAIL SET FOR ENV VAR: TO_EMAIL";
            }
            to_email = TO_EMAIL
        }

        const  errorNotificationEmailTemplate = require('./html_templates/errorNotificationEmailTemplate')(req,error)
            
            const email_message_data = {
                to_email:to_email,
                subject:subject,
                fallback_text:"Could not show errorNotificationEmailTemplate in this email client",
                html:errorNotificationEmailTemplate
                };
            try{
                let response = await axios.post(EMAIL_SERVICE_URL + '/notification', email_message_data);
                return response;
            }catch(ex){
                console.log("Error: ", JSON.stringify(ex))
            }
    }

    //Test locally by giving webhook_type != Transactions in request
    static async send_NON_Transaction_Default_updated_Webhook_Email(req, subject='Non-Transaction Webhook',to_email){

        if(to_email==null){
            if(TO_EMAIL==null){
                console.log("NO DEFAULT EMAIL SET FOR ENV VAR: TO_EMAIL")
                return "NO DEFAULT EMAIL SET FOR ENV VAR: TO_EMAIL";
            }
            to_email = TO_EMAIL
        }

        const nonTransactionWebhookEmail = require('./html_templates/nonTransactionWebhookEmail')(req)
        // console.log("nonTransactionWebhookEmail: ",nonTransactionWebhookEmail)
        const email_message_data = {
            to_email:to_email,
            subject:subject,
            fallback_text:"Could not show nonTransactionWebhookEmail in this email client",
            html:nonTransactionWebhookEmail
            };
        try{
            let response = await axios.post(EMAIL_SERVICE_URL + '/notification', email_message_data);
            return response;
        }catch(ex){
            console.log("Error: ", JSON.stringify(ex))
        }
    }
}
module.exports=Sendgrid;