CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email TEXT NOT NULL CHECK (position('@' IN email) > 1),
  name VARCHAR(15) NOT NULL,
  password TEXT NOT NULL,
  active BOOLEAN NOT NULL DEFAULT TRUE
);