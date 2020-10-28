
class Sendgrid{

    ///Send the new transactions in email
    static send_New_Transactions_EMAIL(context, req, new_transactions, to_email='dariv94@gmail.com', 
        from_email='frankgriviera@outlook.com',
        subject='New Transactions', text='New Transactions EMAIL Default text' ){
            console.log("send_New_Transactions_EMAIL CALLED")
    }
    
    static send_Error_Notification_Email(context, req, error, subject='Error Notification',
        to_email='dariv94@gmail.com', 
        from_email='frankgriviera@outlook.com',
        text=' Default text' ){
            console.log("send_Error_Notification_Email CALLED")
    }

    static send_NON_Transaction_Default_updated_Webhook_Email(context, req, subject='Non-Transaction Webhook',
    to_email='dariv94@gmail.com', 
    from_email='frankgriviera@outlook.com',
    text=' Default text' ){
        console.log("send_NON_Transaction_Default_updated_Webhook_Email CALLED")
    }
}
module.exports=Sendgrid;