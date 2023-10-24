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
  --new:
  -- email TEXT CHECK (position('@' IN email) > 1),
  --
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
  ins_group_number TEXT,
  ins_front_pid TEXT,
  ins_back_pid TEXT
);
CREATE TABLE appointments (
  id VARCHAR(20) NOT NULL,
  provider_id TEXT REFERENCES providers ON DELETE CASCADE,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  appt_at BIGINT NOT NULL,
  email TEXT CHECK (position('@' IN email) > 1),
  complete BOOLEAN NOT NULL DEFAULT FALSE,
  intake_id INTEGER REFERENCES intakes ON DELETE CASCADE,
  phone VARCHAR(10),
  PRIMARY KEY (id)
);