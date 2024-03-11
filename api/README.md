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

This project utilized [Express](https://expressjs.com/en/4x/api.html) serves as a HTTP server, [node-postgres](https://node-postgres.com/) interface with our PostgresSQL database.

## NPM Scripts

1. `dev` which runs `nodemon` using the `./nodemon.json` configuration file to watch the file changes and restart the server.
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
5. Write test first, before you code, be clear what you have when function call, and what you want from function as return.
6. After all your test passed, manually test the API using Postman.
7. Of course you can change existing logic, but don't forget to change related tests.

## Processing Request

## Build

## Deploy
