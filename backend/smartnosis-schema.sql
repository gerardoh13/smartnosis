CREATE TABLE providers (
  id SERIAL PRIMARY KEY,
  org_name VARCHAR(15) NOT NULL,
  npi INTEGER,
  email TEXT NOT NULL CHECK (position('@' IN email) > 1),
  address1 TEXT NOT NULL,
  address2 TEXT,
  city VARCHAR(15) NOT NULL,
  state VARCHAR(2) NOT NULL,
  zip INTEGER,
  password TEXT NOT NULL
);