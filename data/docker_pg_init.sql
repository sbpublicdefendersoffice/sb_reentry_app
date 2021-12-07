CREATE TABLE organizations
(
    id SERIAL PRIMARY KEY,
    name_english TEXT,
    name_spanish TEXT,
    website TEXT,
    languages_spoken_english TEXT,
    languages_spoken_spanish TEXT,
    customers_served_english TEXT,
    customers_served_spanish TEXT,
    notes_english TEXT,
    notes_spanish TEXT,
    categories_english TEXT
    [],
	categories_spanish TEXT[],
	tags_english TEXT[],
	tags_spanish TEXT[]
);

    CREATE TABLE locations
    (
        id SERIAL PRIMARY KEY,
        city TEXT,
        name TEXT,
        website TEXT,
        address TEXT,
        address_2 TEXT,
        zip INT,
        state VARCHAR(2),
        phone TEXT,
        email TEXT,
        notes TEXT,
        latitude DOUBLE PRECISION,
        longitude DOUBLE PRECISION
    );

    CREATE TABLE services
    (
        id SERIAL PRIMARY KEY,
        name_english TEXT,
        name_spanish TEXT
    );

    CREATE TABLE schedules
    (
        id SERIAL PRIMARY KEY,
        open_time TEXT,
        close_time TEXT,
        days TEXT,
        notes TEXT
    );

    CREATE TABLE is_this_usefuls
    (
        id SERIAL PRIMARY KEY,
        created_at DATE,
        is_useful BOOLEAN,
        route TEXT,
        language TEXT,
        comment TEXT
    );

    CREATE TABLE cbos
    (
        id SERIAL PRIMARY KEY,
        created_at DATE,
        org TEXT,
        orgId INT,
        email TEXT,
        hashedPassword TEXT,
        verificationString TEXT,
        passwordResetCode TEXT,
        isVerified BOOLEAN,
    );

    CREATE TABLE clients
    (
        id SERIAL PRIMARY KEY,
        created_at DATE,
        email TEXT,
        hasAppliedForExpungement BOOLEAN,
        hasBeenNotifiedOfExpungement BOOLEAN,
        expungementEmail TEXT,
        phone TEXT,
        expungementXMessageId TEXT,
        commPrefs TEXT[],
        hashedPassword TEXT,
        verificationString TEXT,
        passwordResetCode TEXT,
        isVerified BOOLEAN,
    );

    CREATE TABLE locations_organizations
    (
        locations_id INT,
        organizations_id INT
    );

    CREATE TABLE schedules_locations
    (
        schedules_id INT,
        locations_id INT
    );

    CREATE TABLE schedules_organizations
    (
        schedules_id INT,
        organizations_id INT
    );

    CREATE TABLE services_locations
    (
        services_id INT,
        locations_id INT
    );

    CREATE TABLE services_organizations
    (
        services_id INT,
        organizations_id INT
    );

    COPY organizations
    (id,name_english,name_spanish,website,languages_spoken_english,languages_spoken_spanish,customers_served_english,customers_served_spanish,notes_english,notes_spanish,categories_english,categories_spanish,tags_english,tags_spanish)
	FROM '/mnt/data/organizations.csv'
		DELIMITER ','
			CSV HEADER;

COPY locations
    (id,city,name,website,address,address_2,zip,state,phone,email,notes,latitude,longitude)
	FROM '/mnt/data/locations.csv'
		DELIMITER ','
			CSV HEADER;

COPY services
    (id,name_english,name_spanish)
	FROM '/mnt/data/services.csv'
		DELIMITER ','
			CSV HEADER;

COPY schedules
    (id,open_time,close_time,days,notes)
	FROM '/mnt/data/schedules.csv'
		DELIMITER ','
			CSV HEADER;

COPY locations_organizations
    (locations_id,organizations_id)
	FROM '/mnt/data/locations_organizations.csv'
		DELIMITER ','
			CSV HEADER;

COPY schedules_locations
    (schedules_id,locations_id)
	FROM '/mnt/data/schedules_locations.csv'
		DELIMITER ','
			CSV HEADER;

COPY schedules_organizations
    (schedules_id,organizations_id)
	FROM '/mnt/data/schedules_organizations.csv'
		DELIMITER ','
			CSV HEADER;

COPY services_locations
    (services_id,locations_id)
	FROM '/mnt/data/services_locations.csv'
		DELIMITER ','
			CSV HEADER;

COPY services_organizations
    (services_id,organizations_id)
	FROM '/mnt/data/services_organizations.csv'
		DELIMITER ','
			CSV HEADER;
