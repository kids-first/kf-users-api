<p align="center">
  <img src="docs/portal.svg" alt="Kids First Portal" width="660px">
</p>

<p align="center">
  <a href="https://github.com/kids-first/users-api/blob/main/LICENSE.md"><img src="https://img.shields.io/github/license/kids-first/kf-portal-ui.svg?style=for-the-badge"></a>
</p>

# :busts_in_silhouette: Users API
This project allows to persist users preferences, queries and such.

## :nut_and_bolt: Development
This service needs to communicate to a PostgreSQL database. You can either communicate with a remote database or spin up one locally.
Best practices suggest to use docker && docker-compose. 

### :mortar_board: Pre-requisites
- Node 16+ (if using local node interpreter)
- Docker

### :runner: Run whole project
First, you need to have an `.env` file. With, minimally:
- `KEYCLOAK_URL`
- `KEYCLOAK_REALM`
- `KEYCLOAK_CLIENT`
- `PGHOST`
- `PGPORT`
- `PGDATABASE`
- `PGUSER`
- `PGPASSWORD`

Then, 
```
# In a terminal (at the root of the project)
docker-compose up # Spins up the database 
# In another terminal
docker run --rm -it --network users-api_default -p "1212:1212" -v $PWD:/code --workdir /app node:16.13-alpine sh
npm install # if needed
npm run migrate up # if needed
npm run dev
```
Please note that you may need to tweak some parameters in the above commands according to your setup.
### :hammer: Run tests
```
docker run --rm -it --network users-api_default -p "1212:1212" -v $PWD:/code --workdir /app node:16.13-alpine sh
npm run test
```

### :wrench: Update database schema

- Run `npm run migrate create <describe what you want to change>`, for example: `npm run migrate create add users email column`
- It creates a file `XXX_add-users-email-column.sql` in migrations directory
- Open it up and add your changes inside `-- Up Migration` directive and also add how to roll back these changes inside the `-- Down Migration` directive.

Example: 
```
-- Up Migration
ALTER TABLE users ADD COLUMN email VARCHAR(255);

-- Down Migration
ALTER TABLE users DROP COLUMN email;
```

- Run `npm run migrate up`, it will apply your last changes.
- You need to rollback? Run `npm run migrate down`, it will roll back your last changes based on what you defined inside `-- Down Migration`.
- To rollback more than 1 migration, run `npm run migrate down {N}` where `N` is the number of migrations to rollback.