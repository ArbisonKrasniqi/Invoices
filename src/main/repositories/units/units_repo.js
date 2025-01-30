const units_queries = require('./units_queries');
const {getDB} = require('../../db/db');

class units_repo {
    static async insertUnit(name) {
        const query = units_queries.INSERT_UNIT;

        const db = await getDB();

        return new Promise((resolve, reject) => {
            db.run(query,[name], function (err) {
                if (err) {
                    return reject(err);
                }
                resolve(name);
            });
        });
    }

    static async getUnits() {
        const query = units_queries.GET_UNITS;
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

    static async getUnit(unit_id) {
        const query = units_queries.GET_UNITS + " WHERE unit_id = ?";
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

    static async deleteUnit(unit_id) {
        const query = units_queries.DELETE_UNIT;
        const db = await getDB();

        //DUHET ME KQYR A E PERDOR NAJ ITEM UNIT

        return new Promise((resolve, reject) => {
            db.run(query, [unit_id], function (err) {
                if (err) {
                    return reject(err);
                }
                resolve();
            })
        })
    }

    static async updateUnit(unit) {
        const query = units_queries.UPDATE_UNIT;
        const db = await getDB();

        return new Promise((resolve, reject) => {
            db.run(query,
                [unit.name, unit.unit_id],
                function (err) {
                if (err) {
                    return reject(err);
                }
                resolve(unit);
                });
        });
    }
}

module.exports = {
    units_repo,
};