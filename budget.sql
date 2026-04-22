-- 1. Create the Users Table
-- Create the main Users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    pin_code VARCHAR(4) NOT NULL,
    role VARCHAR(10) CHECK (role IN ('parent', 'child')),
    -- This column links the student to their specific parent
    parent_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Example: When the form is submitted, the backend runs these:
-- 1. Insert Parent
INSERT INTO users (fullname, email, pin_code, role) 
VALUES ('Rajesh Kumar', 'rajesh@email.com', '1234', 'parent');

-- 2. Insert Student (using the ID from the Parent we just created)
INSERT INTO users (fullname, email, pin_code, role, parent_id) 
VALUES ('Aryan Kumar', 'aryan@email.com', '1234', 'child', 1);
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    fullname VARCHAR(100),
    email VARCHAR(100) UNIQUE NOT NULL,
    pin_code VARCHAR(4) NOT NULL, -- Your 4-digit security PIN
    role VARCHAR(10) CHECK (role IN ('parent', 'child')),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Create the Transactions Table
CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    item_name VARCHAR(255) NOT NULL,
    cost DECIMAL(10, 2) NOT NULL,
    student_id INTEGER REFERENCES users(id), -- Links item to the student who asked
    status VARCHAR(20) DEFAULT 'pending',     -- 'pending', 'approved', 'rejected'
    is_flagged BOOLEAN DEFAULT FALSE,        -- For the $10 warning algorithm
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Insert Mock Data for Testing
INSERT INTO users (fullname, email, pin_code, role) 
VALUES ('John Parent', 'parent@test.com', '1234', 'parent');

INSERT INTO users (fullname, email, pin_code, role) 
VALUES ('Jane Student', 'student@test.com', '5678', 'child');
SELECT item_name, cost 
FROM transactions 
WHERE cost > 30.00; -- Flags any item over $30 as a high-cost drain

