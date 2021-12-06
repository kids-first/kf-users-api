-- Up Migration
CREATE UNIQUE INDEX users_keycloak_id ON users (keycloak_id);
ALTER TABLE users ADD CONSTRAINT unique_keycloak_id UNIQUE USING INDEX users_keycloak_id;

-- Down Migration
ALTER TABLE users DROP CONSTRAINT unique_keycloak_id;
DROP INDEX IF EXISTS users_keycloak_id;