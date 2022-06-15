
# FGR Budget Webhook

[<img src="./images/1000x1000_FGR_FINANCE.png" width="100" >](http://kubernetes-demo.frankieriviera.com)

This is the webhook microservice used in the [Kubernetes Demo](https://frankieriviera.com/portfolio/kubernetes-demo) by [Frankie Riviera](https://frankieriviera.com)


# Develpment

## Getting Started

### Environment Variables

Example .env
```
DATABASE_URL=<DATABASE_URL>
NODE_ENV=sandbox
PLAID_DEV_CLIENT_ID=<PLAID_DEV_CLIENT_ID>
SANDBOX_PLAID_SECRET=<SANDBOX_PLAID_SECRET>
PLAID_DEV_SECRET=<PLAID_DEV_SECRET>
EMAIL_SERVICE_URL=<EMAIL_SERVICE_URL>
TO_EMAIL=<Your_email>
```

**DATABASE_URL** The connection_string to your Postgres SQL database. If you are are using the docker-compose.yaml file this is defaulted to `DATABASE_URL=postgres://postgres:postgres@pg1:5432/local_fgr_budget`

**NODE_ENV** is set as *sandbox* to call the sandbox Plaid API. Any other value would result in making a call to get transactions and accounts of "live" bank data

**PLAID_DEV_CLIENT_ID** This is used for the Plaid API to identify you when making calls to the Plaid API. You can get a Client ID and your secrets when you sign up for an account at https://plaid.com/

**SANDBOX_PLAID_SECRET** This is used to authorize access to Plaid Sandbox API. You can get a Client ID and your secrets when you sign up for an account at https://plaid.com/

**PLAID_DEV_SECRET** This is used to authorize access to Plaid Development API which uses live Bank info. You can get a Client ID and your secrets when you sign up for an account at https://plaid.com/

**EMAIL_SERVICE_URL** Url to connect to the [FGR-budget-email-service](https://github.com/DaRiv94/fgr_budget_email_service) in order to send email notifications

**TO_EMAIL** Default email that email notifications should be sent do.


### Create local volume if not already created
`docker volume create --name=postgres_db_volume`

### Starting app
Once you have your .env file at the root of your project you can start up the webhook service and postgres db for development with 
`docker-compose up`

### Connect for development to db from local machine 
`postgres://postgres:postgres@127.0.0.1:5432/local_fgr_budget`

### Connect for development to db from another container
`postgres://postgres:postgres@pg1:5432/local_fgr_budget`

---

### Helpful Sequelize CLI commands

Check migrations
`docker exec webhook_backend npx sequelize db:migrate:status`

Run Migrations
`docker exec webhook_backend npx sequelize db:migrate`

Undo last Migration
`docker exec webhook_backend npx sequelize db:migrate:undo`

Generate a model (This will generate a model and migration file)
`docker exec webhook_backend npx sequelize model:generate --name ModelName --attributes attribute_one:string,attribute_two:string,attribute_three:double,attribute_four:date`

For more info on migrations see https://sequelize.org/master/manual/migrations.html






---
### NOTE TO SELF When Developing with Windows 10 Home
Docker Toolbox does not play nice with docker-compose, so when I am developing with a windows 10 Home machine use the following cmds to start webhook and postgres db
`docker run --rm -p 3500:3500 --name webhook_backend --network budget --env-file .env -v /app/node_modules  -v /c/Users/frank/OneDrive/Development/02_Projects_In_Production/0027_PersonalBudgetApp/fgr-budget-webhook-v2:/app dariv94/kubebud_webhook npm run app`

`docker run --rm -p 5432:5432 --name pg1 --network budget -v postgres_db_volume:/var/lib/postgresql/data -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=local_fgr_budget postgres:13.0`