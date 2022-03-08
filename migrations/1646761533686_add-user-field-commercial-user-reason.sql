-- Up Migration
ALTER TABLE users 
    ADD COLUMN commercial_use_reason TEXT;

-- Down Migration
ALTER TABLE users 
    DROP COLUMN commercial_use_reason;