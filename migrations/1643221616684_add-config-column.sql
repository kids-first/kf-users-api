-- Up Migration
ALTER TABLE users 
    ADD COLUMN config JSONB not null default '{}'::jsonb;

-- Down Migration
ALTER TABLE users 
    DROP COLUMN config;