-- Up Migration
ALTER TABLE user_sets
    ADD COLUMN content JSONB NOT NULL DEFAULT '{}'::JSONB,
    ADD COLUMN alias TEXT,
    ADD COLUMN sharedPublicly BOOLEAN  NOT NULL DEFAULT false,
    DROP COLUMN size,
    DROP COLUMN ids,
    DROP COLUMN tag,
    DROP COLUMN set_type,
    DROP COLUMN path,
    DROP COLUMN sqon

-- Down Migration
ALTER TABLE user_sets
    DROP COLUMN content,
    DROP COLUMN alias,
    DROP COLUMN sharedPublicly,