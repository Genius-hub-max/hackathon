-- MedFinder Database Schema

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(50) DEFAULT 'patient',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE drugs (
    id SERIAL PRIMARY KEY,
    generic_name VARCHAR(255) NOT NULL,
    brand_name VARCHAR(255),
    rxnorm_id VARCHAR(50),
    atc_code VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE pharmacies (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT,
    lat DECIMAL(10, 8),
    lng DECIMAL(11, 8),
    phone VARCHAR(20),
    hours JSONB,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE prices (
    id SERIAL PRIMARY KEY,
    drug_id INTEGER REFERENCES drugs(id),
    pharmacy_id INTEGER REFERENCES pharmacies(id),
    generic_price DECIMAL(10, 2),
    brand_price DECIMAL(10, 2),
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    source VARCHAR(50)
);

CREATE TABLE searches (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    drug_name VARCHAR(255),
    lat DECIMAL(10, 8),
    lng DECIMAL(11, 8),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE stock_reports (
    id SERIAL PRIMARY KEY,
    pharmacy_id INTEGER REFERENCES pharmacies(id),
    drug_id INTEGER REFERENCES drugs(id),
    in_stock BOOLEAN,
    reported_by INTEGER REFERENCES users(id),
    confidence DECIMAL(3, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE insurers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    copay_generic DECIMAL(10, 2),
    copay_brand DECIMAL(10, 2)
);

-- Indexes
CREATE INDEX idx_prices_drug ON prices(drug_id);
CREATE INDEX idx_prices_pharmacy ON prices(pharmacy_id);
CREATE INDEX idx_searches_user ON searches(user_id);
CREATE INDEX idx_pharmacies_location ON pharmacies(lat, lng);

-- Mock Data
INSERT INTO drugs (generic_name, brand_name, rxnorm_id, atc_code) VALUES
('lisinopril', 'Prinivil', '29046', 'C09AA03'),
('atorvastatin', 'Lipitor', '83367', 'C10AA05'),
('metformin', 'Glucophage', '6809', 'A10BA02'),
('amlodipine', 'Norvasc', '17767', 'C08CA01'),
('omeprazole', 'Prilosec', '7646', 'A02BC01');

INSERT INTO pharmacies (name, address, lat, lng, phone) VALUES
('CVS Pharmacy', '123 Main St, New York, NY', 40.7580, -73.9855, '555-0101'),
('Walgreens', '456 Broadway, New York, NY', 40.7614, -73.9776, '555-0102'),
('Rite Aid', '789 5th Ave, New York, NY', 40.7489, -73.9680, '555-0103'),
('Walmart Pharmacy', '321 Park Ave, New York, NY', 40.7128, -74.0060, '555-0104');

INSERT INTO prices (drug_id, pharmacy_id, generic_price, brand_price) VALUES
(1, 1, 15.50, 54.25),
(1, 2, 21.00, 58.00),
(1, 3, 18.75, 52.50),
(1, 4, 12.99, 49.99);
