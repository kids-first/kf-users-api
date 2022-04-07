-- Up Migration
ALTER TABLE user_sets
    RENAME COLUMN creation_date TO creationDate;
    RENAME COLUMN updated_date TO updatedDate;

-- Down Migration
ALTER TABLE user_sets
    RENAME COLUMN creationDate TO creation_date;
    RENAME COLUMN updatedDate TO updated_date;