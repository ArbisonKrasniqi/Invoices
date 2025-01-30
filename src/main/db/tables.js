const CREATE_CUSTOMERS_TABLE = `
  CREATE TABLE IF NOT EXISTS Customers (
    customer_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT,
    email TEXT,
    contact_number TEXT
  );
`;

const CREATE_TAX_TYPES_TABLE = `
    CREATE TABLE IF NOT EXISTS Tax_Types (
        tax_type_id INTEGER PRIMARY KEY AUTOINCREMENT,
        label TEXT NOT NULL,         
        value DECIMAL(5, 2) NOT NULL
        );
`

const CREATE_UNITS_TABLE = `
CREATE TABLE IF NOT EXISTS Units (
    unit_id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Auto-increment unit_id
    name TEXT NOT NULL                          -- Name of the unit (e.g., "kg", "meter", "liter")
);
`

const CREATE_ITEMS_TABLE = `
CREATE TABLE IF NOT EXISTS Items (
    item_id INTEGER PRIMARY KEY AUTOINCREMENT,  -- Auto-increment item_id
    name TEXT NOT NULL,                          -- Name of the item (e.g., "Apple", "Laptop")
    price DOUBLE NOT NULL,                       -- Price of the item
    unit_id INTEGER,                             -- Foreign key referencing unit_id from Units table
    tax_type_id INTEGER,                         -- Foreign key referencing tax_type_id from Tax_Types table
    FOREIGN KEY (unit_id) REFERENCES Units(unit_id),  -- Foreign key constraint on unit_id
    FOREIGN KEY (tax_type_id) REFERENCES Tax_Types(tax_type_id)  -- Foreign key constraint on tax_type_id
);
`

const CREATE_SETTINGS_TABLE = `
    CREATE TABLE IF NOT EXISTS Settings (
        key TEXT PRIMARY KEY,
        value INTEGER NOT NULL
    );
`;

const INSERT_INITIAL_COUNTER = `
    INSERT OR IGNORE INTO Settings (key, value) VALUES ('next_invoice_number', 1);
`;



module.exports = {
    CREATE_CUSTOMERS_TABLE,
    CREATE_TAX_TYPES_TABLE,
    CREATE_UNITS_TABLE,
    CREATE_ITEMS_TABLE,
    CREATE_SETTINGS_TABLE,
    INSERT_INITIAL_COUNTER
};