-- Up Migration
ALTER TABLE saved_filters 
    ADD COLUMN favorite BOOLEAN NOT NULL DEFAULT false;

-- Down Migration
ALTER TABLE saved_filters 
    DROP COLUMN favorite;