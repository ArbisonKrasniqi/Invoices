const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const tables = require('./tables.js');

// Path to the database file relative to main.js node
const dbPath = path.resolve(process.cwd(), './database/invoices.db');

// Singleton instance of the database
let db;

// Singleton pattern to return the existing database connection
const getDB = async () => {
    if (!db) {
        // Create and export the database connection if it doesn't exist
        db = new sqlite3.Database(dbPath, (err) => {
            if (err) {
                console.error('Error connecting to the SQLite database:');
                console.error('Message:', err.message);
                console.error('Code:', err.code);
                console.error('Stack:', err.stack);
            } else {
                console.log('Connected to the SQLite database at', dbPath);
            }
        });
    }
    return db;
};

const initializeDatabase = () => {
    //Ignore getDB promise
    getDB();
    return new Promise((resolve, reject) => {
        // Array of all table creation queries
        const createTableQueries = Object.values(tables);

        // Use async/await to handle table creation sequentially
        const createTables = async () => {
            for (const [index, query] of createTableQueries.entries()) {
                try {
                    await new Promise((resolve, reject) => {
                        db.run(query, function (err) {
                            if (err) {
                                reject(`Error creating table ${index + 1}: ${err.message}`);
                                return;
                            }
                            resolve();
                        });
                    });
                } catch (err) {
                    reject(err);
                    return;
                }
            }
            resolve(db);  // Resolve with db after all tables are created
        };

        createTables().catch(reject);  // Start the table creation process
    });
};

// Export functions for database initialization and retrieval
module.exports = {
    initializeDatabase,
    getDB
};
