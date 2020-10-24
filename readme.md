
When Starting a Postgres container locally run,
```
docker run --name pg4 -e POSTGRES_PASSWORD='postgres' -e POSTGRES_USER='postgres' -e POSTGRES_DB=local_fgr_budget -v pgdata:/var/lib/postgresql/data -p 5433:5432 postgres
```


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