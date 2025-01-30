const items_queries = require('./items_queries');
const { getDB } = require('../../db/db');
const units_queries = require("./items_queries");

class items_repo {
    static async insertItem(item) {
        const query = items_queries.INSERT_ITEM;
        const db = await getDB();

        return new Promise((resolve, reject) => {
            db.run(
                query,
                [
                    item.name,
                    item.price,
                    item.unit_id,
                    item.tax_type_id,
                ],
                function (err) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(item);
                }
            );
        });
    }

    static async getItem(item_id) {
        const query = items_queries.GET_ITEMS + " WHERE item_id = ?";
        const db = await getDB();

        return new Promise((resolve, reject) => {
            db.all(query, [item_id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    static async getItems() {
        const query = items_queries.GET_ITEMS;
        const db = await getDB();
        return new Promise((resolve, reject) => {
            db.all(query, (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    static async deleteItem(item_id) {
        const query = items_queries.DELETE_ITEM;
        const db = await getDB();

        return new Promise((resolve, reject) => {
            db.run(query, [item_id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    static async updateItem(item) {
        const query = items_queries.UPDATE_ITEM;
        const db = await getDB();

        return new Promise((resolve, reject) => {
            db.run(query,
                [
                    item.name,
                    item.price,
                    item.unit_id,
                    item.tax_type_id,
                    item.item_id],
                function (err) {
                    if (err) {
                        return reject(err);
                    }
                    resolve(item);
                });
        });
    }

    static async getItemsByUnit(unit_id) {
        const query = units_queries.GET_ITEMS;
        const db = await getDB();

        return new Promise((resolve, reject) => {
            db.all(query, [unit_id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            });
        });
    }

    static async getItemsByTaxType(tax_type_id) {
        const query = units_queries.GET_ITEMS_BY_TAX_TYPE;
        const db = await getDB();

        return new Promise( (resolve, reject) => {
            db.all(query, [tax_type_id], (err, result) => {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            })
        })
    }
}

module.exports = {
    items_repo
};
