-- Up Migration
ALTER TABLE users 
    ADD COLUMN email TEXT;

-- Down Migration
ALTER TABLE users 
    DROP COLUMN email;