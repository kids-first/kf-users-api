-- Up Migration
CREATE TABLE users (
    id SERIAL NOT NULL,
    keycloak_id VARCHAR(255) NOT NULL,
    creation_date TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    updated_date TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    consent_date TIMESTAMP WITHOUT TIME ZONE,
    understand_disclaimer BOOLEAN NOT NULL DEFAULT false
);
ALTER TABLE users ADD PRIMARY KEY (id);

-- Down Migration
DROP TABLE users;