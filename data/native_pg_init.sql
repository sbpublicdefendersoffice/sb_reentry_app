CREATE DATABASE thrive;

CREATE ROLE thrive LOGIN SUPERUSER PASSWORD 'sbc';

GRANT ALL PRIVILEGES ON DATABASE thrive TO thrive;

GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO thrive;

