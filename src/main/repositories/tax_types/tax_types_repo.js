const tax_types_queries = require('./tax_types_queries');
const {getDB} = require('../../db/db');

class tax_types_repo {
    static async insertTaxType(tax_type) {
        const query = tax_types_queries.INSERT_TAX_TYPE;
        const db = await getDB();

        return new Promise((resolve, reject) => {
            db.run(query, [tax_type.label, tax_type.value], function (err) {
                if (err) {
                    reject(err);
                }
                resolve(tax_type);
            });
        });
    }

    static async getTaxTypes() {
        const query = tax_types_queries.GET_TAX_TYPES;
        const db = await getDB();

        return new Promise((resolve, reject) => {
            db.all(query, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }

    static async getTaxType(tax_type_id) {
        const query = tax_types_queries.GET_TAX_TYPES + " WHERE tax_type_id = ?";
        const db = await getDB();

        return new Promise((resolve, reject) => {
            db.all(query, [tax_type_id], (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            });
        });
    }

    static async deleteTaxType(tax_type_id) {
        const query = tax_types_queries.DELETE_TAX_TYPE;
        const db = await getDB();


        //DUHET ME KQYR A E PERDOR NAJ ITEM TAXTYPE

        return new Promise((resolve, reject) => {
            db.run(query, [tax_type_id], function (err) {
                if (err) {
                    reject(err);
                }
                resolve(tax_type_id);
            });
        });
    }

    static async updateTaxType(tax_type) {
        const query = tax_types_queries.UPDATE_TAX_TYPE;
        const db = await getDB();

        return new Promise((resolve, reject) => {
            db.run(query,
            [tax_type.label, tax_type.value, tax_type.tax_type_id],
            function (err) {
                if (err) {
                    reject(err);
                }
                resolve(tax_type);
            });
        });
    }
}