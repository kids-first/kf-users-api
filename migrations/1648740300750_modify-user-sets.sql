-- Up Migration
ALTER TABLE user_sets
    ADD COLUMN size INTEGER not null default 0,
    ADD COLUMN ids TEXT[],
    DROP COLUMN sort

-- Down Migration
ALTER TABLE user_sets
    DROP COLUMN size,
    DROP COLUMN ids