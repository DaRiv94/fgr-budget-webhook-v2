const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/', async (req, res) => {
    // try {
    //     return res.json({"webhookHit":true})
    // } catch (error) {
    //     console.error(error)
    // }
    //////////////////////
    console.log("console.log logging at begining");
    let context={}

    if (req.body && req.body.webhook_type) {
        ThisIsATest=false;
        if (req.body.test && req.body.test==true){
            ThisIsATest=true;
        }

    //Imports
    const axios = require('axios');
    const moment = require('moment');
    const Sendgrid = require("./emails/Sendgrid");
    const CreateNewWebhookNotification = require("./helpermethods/createNewWebhookNotification");
    const GetOrCreateAccount = require("./helpermethods/GetOrCreateAccounts");
    const GetOrCreateTransactions = require("./helpermethods/GetOrCreateTransactions");
    
    /////START HERE TO UPDATE___________________________________________________________________
    //_______________________________________________________________________________________
    ///UPDATE FUNCTION!!
    let webhookNotification = CreateNewWebhookNotification(context, req, ThisIsATest);                   

    if (req.body.webhook_type=="TRANSACTIONS"){

        if (webhookNotification){
            let access_token=""
            if(req.body.item_id==process.env.MSUFCU_ITEM_ID){
                access_token =process.env.PLAID_MSUFCU_ACCESS_TOKEN;
            }else if(req.body.item_id==process.env.ALLY_ITEM_ID){
                access_token =process.env.PLAID_ALLY_ACCESS_TOKEN;
            }else{
                console.log("Invalid item_id");
               
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

            
            //Can I use async await here????
            try{
                response = await axios.post('https://development.plaid.com/transactions/get',data);

                let new_transactions=[]
                console.log("Console- Fetching recent transaction data from plaid...");
             

                //remove accounts in mongo compass to test this functionality.
                if(response.data && response.data.accounts && response.data.transactions){

                    await GetOrCreateAccount(context, req, response, ThisIsATest);

                    new_transactions = await GetOrCreateTransactions(context, response, ThisIsATest)

                }
                console.log(`${new_transactions.length} new transactions`)
              
                if(new_transactions.length != 0){

                    if (!ThisIsATest) {
                        Sendgrid.send_New_Transactions_EMAIL(context, req, new_transactions);
                    }else{
                  
                        console.log("------------------------------------------")
                        console.log("EMAIL NOT SENT DURING TEST WEBHOOK REQUESTS")
                        console.log("------------------------------------------")
                    }

                }

            }catch(error){
                //Test locally by deleting a new transaction from db a bad item_id in request
                if (!ThisIsATest) {
                    Sendgrid.send_Error_Notification_Email(context, req, error, "Transaction Data Error");
                }else{
                  
                    console.log("------------------------------------------")
                    console.log("EMAIL NOT SENT DURING TEST WEBHOOK REQUESTS")
                    console.log("------------------------------------------")
                }
            }
        }
        }else{
            //Test locally by giving webhook_type != Transactions in request
            if (!ThisIsATest) {
                Sendgrid.send_NON_Transaction_Webhook_Email(context, req);
            }else{
         
                console.log("------------------------------------------")
                console.log("EMAIL NOT SENT DURING TEST WEBHOOK REQUESTS")
                console.log("------------------------------------------")
            }

        }

        return res.send({
            // status: 200, /* Defaults to 200 */
            body: "received"
        });
    }
    else {
        //THIS has been tested!! by just not sending a post body.
        // although I need to look up how to respond with a body in response again.
        console.log('No Webhook type detected.');
        // console.log("Request: ", req);
        return res.sendStatus(400);
        // return res.sendStatus(400).send({
        //     body: "plaid webhook body required"
        // });
    }

    /////////////////////
})

module.exports = router;