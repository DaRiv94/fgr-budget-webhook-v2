
When Starting a Postgres container locally run,
```
docker run --name pg1 -e POSTGRES_PASSWORD='postgres' -e POSTGRES_USER='postgres' -e POSTGRES_DB=local_fgr_budget -v pgdata:/var/lib/postgresql/data -p 5432:5432 --network budget postgres
```
Once this container starts you will have a db connectionstring `postgres://postgres:postgres@pg1:5432/local_fgr_budget`


Build container if you need to
```
docker build -t fgrnode1 .
```

start up container for development using nodemon
```
docker run -it --network budget -v ${pwd}:/app -v/app/node_modules  --env-file .env -p 3000:3000 fgrnode2 npm run app
```

*If you are starting with a fresh database and container*
`docker exec -it <mycontainer> npx sequelize db:migrate`


----
ENV
```
DATABASE_URL=postgres://postgres:postgres@pg1:5432/local_fgr_budget
NODE_ENV=sandbox
PLAID_DEV_CLIENT_ID=<PLAID_DEV_CLIENT_ID>
SANDBOX_PLAID_SECRET=<SANDBOX_PLAID_SECRET>
PLAID_DEV_SECRET=<PLAID_DEV_SECRET>
EMAIL_SERVICE_URL=http://fgr_budget_email_service_web_1:5500
TO_EMAIL=<Your_email>
```



Start up docker compose
```
docker-compose up
```

Then if you have a fresh volume or new database check the migration status with `docker exec webhook_backend npx sequelize db:migrate:status`

and run migrations with `docker exec webhook_backend npx sequelize db:migrate`




.env file (and examples)

```
LOCAL_DB_USERNAME=postgres
LOCAL_DB_PASSWORD=postgres
LOCAL_DB=local_fgr_budget
LOCAL_DB_HOST=172.0.0.1( or 192.168.99.100 with docker container with docker toolbox)
LOCAL_DB_PORT=5432
DATABASE_URL=postgres://postgres:postgres@172.0.0.1:5432/local_fgr_budget ( or 192.168.99.100 with docker container with docker toolbox)
NODE_ENV=development
```

Using Sequelize-cli
Either locally on repo or exec on container

Generating a model creates the migration file and the model
```
npx sequelize model:generate --name Account --attributes item_id:string,account_id:string,name:string,official_name:string,available_balence:double,current_balence:double
```

running migrations
see https://sequelize.org/master/manual/migrations.html

to make small modifications like to a specifc column see this arctle for reference
https://dev.to/anayooleru/modifying-an-existing-sequelize-migration-1mnn

----
Using Docker Toolbox Start containers in this folder with

`docker run --rm -p 3500:3500 --name webhook_backend --network budget --env-file .env -v /app/node_modules  -v /c/Users/frank/OneDrive/Development/02_Projects_In_Production/0027_PersonalBudgetApp/fgr-budget-webhook-v2:/app webhook npm run app`

`docker run --rm -p 5432:5432 --name pg1 --network budget -v postgres_db_volume:/var/lib/postgresql/data -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=local_fgr_budget postgres:13.0`

