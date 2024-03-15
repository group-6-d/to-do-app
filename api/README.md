# ToDo REST Server

This is the REST Server for our ToDo app. In this page you'll learn:

1. How to setup the development environment
2. Recommended api development approach
3. How this server is layered
4. How a request is processed:
   1. How to do authentication
   2. How to parsing the request
   3. How to query the DB and last h
   4. How to respond
5. How to build
6. How to deploy

## ENV

1. Copy the `.env.local` file as `.env`;
2. Get for the `DB_PASSWORD` from Jinjing;

## Architecture

This project utilized [Express](https://expressjs.com/en/4x/api.html) serves as a HTTP server, [node-postgres](https://node-postgres.com/) interfacing with our PostgresSQL database.

### File Structure

```md
.
├── migrations
│   ├── 20240310130452-create-user.js
│   └── sqls
│       ├── 20240310130452-create-user-down.sql
│       ├── 20240310130452-create-user-up.sql
├── scripts
│   └── run_schemats.sh
├── src
│   ├── app.test.ts
│   ├── app.ts
│   ├── client
│   │   └── db.ts
│   ├── db
│   │   └── user.ts
│   ├── model
│   │   └── User.ts
│   ├── schemas.ts
│   ├── server.ts
│   └── service
│       └── users.ts
├── database.json
```

1. `migrations` database migration files goes here, normally 3 files will be generate after running `npm run db:mc`, in this case
   1. `20240310130452-create-user-up.sql` the migration up file, for create or alter tables/indexes/constraints...
   2. `20240310130452-create-user-down.sql` the migration down file, for revert related up changes.
   3. `20240310130452-create-user.js` the script runs the up and down SQL file.
   4. filename pattern {data}-{migration-name-you-choose}-{up|down}.{sql|js}
2. `scripts` all the automatic scripts goes here
   1. `run_schemats.sh` construct a Postgres connection string for [schemats](https://github.com/vramework/schemats) and run it to generate TypeScript interfaces from the database schema.
3. `src` contains all our business logic, basically translate RESTful manner requests to sql query and return the corresponding response.
4. `database.json` config file for [db-migrate](https://github.com/db-migrate/node-db-migrate)

## NPM Scripts

1. `dev` which runs `tsx` using the [tsx](https://github.com/privatenumber/tsx) watch the file changes and restart the server.
2. `build` which runs `npx tsc` to build this project.
3. `start` which runs `node dist/src/server.js` to start the builded project.
4. `test` which runs `jest` using the `./jest.config.js` configuration file to run the tests once.
5. `test:watch` which runs `jest` using the `./jest.config.js` configuration file to watch the file changes and run the related tests.
6. `lint` which runs `eslint` using the `./eslint.config.mjs` configuration file to lint this project.
7. `format` which runs `prettier . --write` using the `./.prettierrc` configuration file to format the code.
8. `db:mc` which runs `db-migrate create` to create a database migration, run this one whenever you want to alter/create anything db stuff.
9. `db:mu` which runs `db-migrate up` to execute the migrations of currently configured migrations directory.
10. `db:md` which runs `db-migrate down` to executes the down migrations of currently configured migrations directory. NOTE: this only migrate the last executed down migration.
11. `db:reset` which runs `db-migrate reset` to execute all down migrations.
12. `db:schema` which runs `./scripts/run_schemats.sh` to generate TypeScript interface definitions from Postgres SQL database schema automatically.

## Development

Recommended develope approach

1. `cd api` change your work directory to `api`, if needed.
2. `npm i` install all the dependencies, if needed.
3. `npm run dev` run the dev server.
4. `npm run test:watch` watch file changes and run the related tests.
5. Before you write the code, be clear what you have when calling that function, and what you want from function as return.
6. Write test first.
7. After all your tests have passed, manually test the API using Postman.
8. And then test with existing UI or implement the UI part.
9. Of course you can change existing logic, but don't forget to change related tests.

## Processing Request

## Build

## Deploy
