const {getAccountById, getBankByItemId } = require('../../helpermethods/repositoryMethods');

//bring in like so.. const newTransactionsEmailTemplate = require('./newTransactionsEmailTemplate')(req,new_transactions)
module.exports = async function(req,new_transactions){
  

  let new_transaction_html_markup = ""
  let bank = "UNKNOWN";

  for(let i =0;i<new_transactions.length;i++){
      let account=await getAccountById(new_transactions[i].account_id)
      let id=new_transactions[i].transaction_id;
      let name=new_transactions[i].name;
      let amount=new_transactions[i].amount;
      let date = new_transactions[i].date;
      
      //Populate bank if I havent already
      if(bank == "UNKNOWN"){
        bank = await getBankByItemId(account.item_id)
      }

      new_transaction_html_markup += `<div>
          <ul>
              <li>ACCOUNT: ${account.name}</li>
              <li>ACCOUNT_ID: ${account.account_id}</li>
              <li>ID: ${id}</li>
              <li>DATE: ${date}</li>
              <li>NAME: ${name}</li>
              <li>AMOUNT: ${amount}</li>
          </ul>
          <hr>
      </div>`
  }

  let metadata=JSON.stringify(req.body);
  metadata = `<hr><div>${metadata}</div>`

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <title></title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <style type="text/css">
      h1 {
        color: orange;
      }
      div {
        color: black;
      }
    </style>
   
  </head>
  
  <body style="background-color: #ffffee;">

  <h1>BANK: ${bank.institution_name}</h1>
  ${new_transaction_html_markup}
  ${metadata}
  </body>
  </html>
`}

// view and edit with http://htmledit.squarefree.com/
//Current Example
/**
 *   <!DOCTYPE html>
  <html lang="en">
  <head>
    <title></title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <style type="text/css">
      h1 {
        color: orange;
      }
      div {
        color: black;
      }
    </style>
   
  </head>
  
  <body style="background-color: #ffffee;">

  <h1>BANK: Chase</h1>
  <div>
          <ul>
              <li>ACCOUNT: Plaid Checking</li>
              <li>ACCOUNT_ID: wwQeRXAwapIBjqXGkvowCaRAmwJgzbsrXe76N</li>
              <li>ID: gdlLMaAdnBCaQoxE6VnjIwqjzRd1oPHgwzmnk</li>
              <li>DATE: Sun Nov 08 2020 00:00:00 GMT+0000 (Coordinated Universal Time)</li>
              <li>NAME: Starbucks</li>
              <li>AMOUNT: 4.33</li>
          </ul>
          <hr>
      </div>
<div>
          <ul>
              <li>ACCOUNT: Plaid Checking</li>
              <li>ACCOUNT_ID: wwQeRXAwapIBjqXGkvowCaRAmwJgzbsrXe76N</li>
              <li>ID: WVqeXy8VjZFGyp9kmXxQF1Vb4pGDZAClyj49P</li>
              <li>DATE: Sat Nov 07 2020 00:00:00 GMT+0000 (Coordinated Universal Time)</li>
              <li>NAME: SparkFun</li>
              <li>AMOUNT: 89.4</li>
          </ul>
          <hr>
      </div>
  <hr><div>{"error":null,"item_id":"BAygLKlAG8tKVgeLbDzJugnk7N318wU4Red6j","new_transactions":9999,"webhook_code":"DEFAULT_UPDATE","webhook_type":"TRANSACTIONS","test":false}</div>
  </body>
  </html>
 */