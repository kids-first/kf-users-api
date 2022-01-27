-- Up Migration
CREATE TABLE saved_filters (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
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