-- Up Migration
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

ALTER TABLE ONLY saved_filters ALTER COLUMN id SET DEFAULT uuid_generate_v4();

-- Down Migration
DROP EXTENSION "uuid-ossp";

ALTER TABLE ONLY saved_filters ALTER COLUMN id SET DEFAULT gen_random_uuid();