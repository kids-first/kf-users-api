-- Up Migration
ALTER TABLE users 
    ADD COLUMN era_commons_id VARCHAR(255),
    ADD COLUMN nih_ned_id VARCHAR(255),
    ADD COLUMN occupation TEXT[],
    ADD COLUMN affiliation TEXT,
    ADD COLUMN research_area TEXT,
    ADD COLUMN portal_usages TEXT[],
    ADD COLUMN accepted_terms BOOLEAN NOT NULL DEFAULT false

-- Down Migration
ALTER TABLE users 
    DROP COLUMN era_commons_id,
    DROP COLUMN nih_ned_id,
    DROP COLUMN occupation,
    DROP COLUMN affiliation,
    DROP COLUMN research_area,
    DROP COLUMN portal_usages,
    DROP COLUMN accepted_terms