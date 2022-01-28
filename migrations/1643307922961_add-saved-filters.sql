-- Up Migration
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE saved_filters (
    id uuid DEFAULT uuid_generate_v4() NOT NULL,
    keycloak_id VARCHAR(255) NOT NULL,
    title TEXT,
    tag TEXT,
    queries JSONB[] NOT NULL DEFAULT array[]::JSONB[],
    creation_date TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    updated_date TIMESTAMP WITHOUT TIME ZONE NOT NULL
);
ALTER TABLE saved_filters ADD PRIMARY KEY (id);

-- Down Migration
DROP TABLE saved_filters;
DROP EXTENSION "uuid-ossp";