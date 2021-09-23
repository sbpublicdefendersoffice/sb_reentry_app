\COPY organizations TO './organizations.csv' DELIMITER ',' CSV HEADER;

\COPY locations TO './locations.csv' DELIMITER ',' CSV HEADER;

\COPY services TO './services.csv' DELIMITER ',' CSV HEADER;

\COPY schedules TO './schedules.csv' DELIMITER ',' CSV HEADER;

\COPY locations_organizations TO './locations_organizations.csv' DELIMITER ',' CSV HEADER;

\COPY schedules_locations TO './schedules_locations.csv' DELIMITER ',' CSV HEADER;

\COPY schedules_organizations TO './schedules_organizations.csv' DELIMITER ',' CSV HEADER;

\COPY services_locations TO './services_locations.csv' DELIMITER ',' CSV HEADER;

\COPY services_organizations TO './services_organizations.csv' DELIMITER ',' CSV HEADER;
