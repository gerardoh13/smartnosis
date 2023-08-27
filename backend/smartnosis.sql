-- psql <  smartnosis.sql
\echo 'Delete and recreate smartnosis db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE smartnosis;
CREATE DATABASE smartnosis;
\connect smartnosis

\i smartnosis-schema.sql

\echo 'Delete and recreate smartnosis_test db?'
\prompt 'Return for yes or control-C to cancel > ' foo

DROP DATABASE smartnosis_test;
CREATE DATABASE smartnosis_test;
\connect smartnosis_test

\i smartnosis-schema.sql
