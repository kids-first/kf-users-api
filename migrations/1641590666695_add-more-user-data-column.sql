-- Up Migration
ALTER TABLE users 
    ADD COLUMN era_commons_id VARCHAR(255),
    ADD COLUMN nih_ned_id VARCHAR(255),
    ADD COLUMN roles TEXT[],
    ADD COLUMN affiliation TEXT,
    ADD COLUMN research_area TEXT,
    ADD COLUMN external_individual_fullname TEXT,
    ADD COLUMN external_individual_email TEXT,
    ADD COLUMN portal_usages TEXT[],
    ADD COLUMN accepted_terms BOOLEAN NOT NULL DEFAULT false,
    ADD COLUMN completed_registration BOOLEAN NOT NULL DEFAULT false

-- Down Migration
ALTER TABLE users 
    DROP COLUMN era_commons_id,
    DROP COLUMN nih_ned_id,
    DROP COLUMN roles,
    DROP COLUMN affiliation,
    DROP COLUMN research_area,
    DROP COLUMN external_individual_fullname,
    DROP COLUMN external_individual_email,
    DROP COLUMN portal_usages,
    DROP COLUMN accepted_terms,
    DROP COLUMN completed_registration