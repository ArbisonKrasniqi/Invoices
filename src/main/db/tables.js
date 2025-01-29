const CREATE_CUSTOMERS_TABLE = `
  CREATE TABLE IF NOT EXISTS Customers (
    customer_id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    address TEXT,
    email TEXT,
    contact_number TEXT
  );
`;

const CREATE_INVOICES_TABLE = `
    CREATE TABLE IF NOT EXISTS Invoices (
        invoice_id TEXT PRIMARY KEY,      -- You will assign the invoice_id manually as a text value
        date_of_issue DATE NOT NULL,       -- Date when the invoice was issued
        customer_id INTEGER,               -- Foreign key referencing customer_id from the Customers table
        FOREIGN KEY (customer_id) REFERENCES Customers (customer_id)
    );
`

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

const CREATE_INVOICE_ITEMS_TABLE = `
    CREATE TABLE IF NOT EXISTS Invoice_Items (
        invoice_id INTEGER,                       -- Foreign key referencing invoice_id from Invoices table
        item_id INTEGER,                          -- Foreign key referencing item_id from Items table
        quantity INTEGER NOT NULL,                -- Quantity of the item in the invoice
        PRIMARY KEY (invoice_id, item_id),        -- Composite primary key (invoice_id, item_id)
        FOREIGN KEY (invoice_id) REFERENCES Invoices(invoice_id),  -- Foreign key constraint on invoice_id
        FOREIGN KEY (item_id) REFERENCES Items(item_id)           -- Foreign key constraint on item_id
    );
`

module.exports = {
    CREATE_CUSTOMERS_TABLE,
    CREATE_INVOICES_TABLE,
    CREATE_TAX_TYPES_TABLE,
    CREATE_UNITS_TABLE,
    CREATE_ITEMS_TABLE,
    CREATE_INVOICE_ITEMS_TABLE
};