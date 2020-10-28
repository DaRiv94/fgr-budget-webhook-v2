const express = require('express');
const router = express.Router();
// const User = require('../models/User');

router.post('/', async (req, res) => {

    //Handle No Request Body, No Plaid Webhook Type
    if (!req.body || !req.body.webhook_type){
        console.log('No Plaid Webhook type detected.');
        return res.status(400).json({detail:"plaid webhook body required"});
    }

    let context={}

    //Check if The webhook is a test
    ThisIsATest=false;
    if (req.body.test && req.body.test==true){
        ThisIsATest=true;
    }

    //Imports
    const axios = require('axios');
    const moment = require('moment');
    const Sendgrid = require("../services/Sendgrid");
    const CreateNewWebhookNotification = require("../helpermethods/createNewWebhookNotification");
    const GetOrCreateAccount = require("../helpermethods/GetOrCreateAccounts");
    const GetOrCreateTransactions = require("../helpermethods/GetOrCreateTransactions");
    
    //Create Webhook Notification
    let webhookNotification = await CreateNewWebhookNotification(req, ThisIsATest);
    if (webhookNotification.error){
        return res.status(500).json({"detail":"There was an error creating webhook","error": webhookNotification.error.toString()});
    }                   

    if (req.body.webhook_type=="TRANSACTIONS" && req.body.webhook_code=="DEFAULT_UPDATE"){

            //I should create an Item table, with id, plaid_item_id, plaid_item_access_token
            // When I do this at first I will need to INSERT INTO the table
            // But then When I create the account update service I want to have a user signup and 
            //   have it add to the item table via another endpoint on this service
            let access_token=""
            if(req.body.item_id==process.env.MSUFCU_ITEM_ID){
                access_token =process.env.PLAID_MSUFCU_ACCESS_TOKEN;
            }else if(req.body.item_id==process.env.ALLY_ITEM_ID){
                access_token =process.env.PLAID_ALLY_ACCESS_TOKEN;
            }else{
                console.log("Invalid item_id");
                if (!ThisIsATest) {
                    Sendgrid.send_Error_Notification_Email(req, error, "Invalid item_id Error");
                }else{
                    console.log("------------------------------------------")
                    console.log("send_Error_Notification_Email EMAIL NOT SENT DURING TEST WEBHOOK REQUESTS")
                    console.log("------------------------------------------")
                }
                return res.status(400).json({detail:"Invalid plaid item_id"});
            }

            let client_id = process.env.PLAID_DEV_CLIENT_ID;
            let secret = process.env.PLAID_DEV_SECRET;
            let start_date = moment().subtract(10, 'days').format('YYYY-MM-DD');
            let end_date = moment().format('YYYY-MM-DD');
            console.log("---------------------------")
            console.log("client_id", client_id)       
            console.log("secret", secret)       
            console.log("access_token", access_token)       
            console.log("start_date", start_date)       
            console.log("end_date", end_date)       
            data={
                client_id, secret, access_token, start_date, end_date
            }           
                try{
                    response = await axios.post('https://development.plaid.com/transactions/get', data);

                    let new_transactions=[]
                    console.log("Console- Fetching recent transaction data from plaid...");
                
                    //remove accounts in mongo compass to test this functionality.
                    if(response.data && response.data.accounts && response.data.transactions){
                        await GetOrCreateAccount(req, response, ThisIsATest);
                        new_transactions = await GetOrCreateTransactions(response, ThisIsATest)
                    }
                    console.log(`${new_transactions.length} new transactions`)
              
                    if(new_transactions.length != 0){
                        if (!ThisIsATest) {
                            Sendgrid.send_New_Transactions_EMAIL(req, new_transactions);
                        }else{
                            console.log("------------------------------------------")
                            console.log("send_New_Transactions_EMAIL EMAIL NOT SENT DURING TEST WEBHOOK REQUESTS")
                            console.log("------------------------------------------")
                        }
                    }
                }catch(error){
                    //Test locally by deleting a new transaction from db and using a bad item_id in request
                    if (!ThisIsATest) {
                        Sendgrid.send_Error_Notification_Email(req, error, "Transaction Data Error");
                    }else{
                        console.log("------------------------------------------")
                        console.log("send_Error_Notification_Email EMAIL NOT SENT DURING TEST WEBHOOK REQUESTS")
                        if (error.response && error.response.data){
                            console.log("send_Error_Notification_Email error: ",error.response.data)
                        }else{
                            console.log("send_Error_Notification_Email error: ",error)
                        }
                        console.log("------------------------------------------")
                    }
                }
    }else{
        //Test locally by giving webhook_type != Transactions in request
        if (!ThisIsATest) {
            Sendgrid.send_NON_Transaction_Default_updated_Webhook_Email(context, req);
        }else{
            console.log("------------------------------------------")
            console.log("send_NON_Transaction_Default_updated_Webhook_Email EMAIL NOT SENT DURING TEST WEBHOOK REQUESTS")
            console.log("------------------------------------------")
        }
    }
    return res.status(200).json({
        detail: "webhook received"
    });
})
module.exports = router;