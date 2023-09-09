CREATE TABLE providers (
  id VARCHAR(20) NOT NULL,
  name VARCHAR(40) NOT NULL,
  npi VARCHAR(10) NOT NULL,
  email TEXT NOT NULL CHECK (position('@' IN email) > 1),
  phone VARCHAR(12) NOT NULL,
  address1 TEXT NOT NULL,
  address2 TEXT,
  city VARCHAR(15) NOT NULL,
  state VARCHAR(2) NOT NULL,
  zip INTEGER,
  password TEXT NOT NULL,
  PRIMARY KEY (id)
);
CREATE TABLE intakes (
  id SERIAL PRIMARY KEY,
  provider_id TEXT NOT NULL REFERENCES providers ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  middle_name TEXT,
  dob TEXT NOT NULL,
  sex VARCHAR(6) NOT NULL,
  address1 TEXT NOT NULL,
  address2 TEXT,
  city VARCHAR(15) NOT NULL,
  state VARCHAR(2) NOT NULL,
  zip INTEGER,
  insurance TEXT,
  phone VARCHAR(12) NOT NULL,
  phone2 VARCHAR(12),
  symptoms VARCHAR [],
  conditions VARCHAR [],
  submitted_at BIGINT NOT NULL,
  --new:
  ins_relationship TEXT,
  ins_firstName TEXT,
  ins_lastName TEXT,
  ins_dob TEXT,
  ins_provider TEXT,
  insurance_id TEXT,
  ins_group_name TEXT,
  ins_group_number TEXT
);
-- CREATE TABLE providers_intakes (
--   provider_id INTEGER REFERENCES providers ON DELETE CASCADE,
--   intake_id INTEGER REFERENCES intakes ON DELETE CASCADE
-- );