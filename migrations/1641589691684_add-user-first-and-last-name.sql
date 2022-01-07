-- Up Migration
ALTER TABLE users 
    ADD COLUMN first_name VARCHAR,
    ADD COLUMN last_name VARCHAR;

-- Down Migration
ALTER TABLE users 
    DROP COLUMN first_name,
    DROP COLUMN last_name;