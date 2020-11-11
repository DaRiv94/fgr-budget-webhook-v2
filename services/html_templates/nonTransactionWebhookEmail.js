

//bring in like so.. const nonTransactionWebhookEmail = require('./nonTransactionWebhookEmail')(req)
module.exports = async function(req){


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
  
    <h1>Errors NOtification</h1>
    
    </body>
    </html>
  `}
  
  