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