const settings_queries = require('./settings_queries')
const {getDB} = require('../../db/db');

class settings_repo {
    static async getSettings() {
        const query = settings_queries.GET_SETTINGS;
        const db = await getDB(query);

        return new Promise((resolve, reject) => {
            db.all(query, (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }

    static async updateSettings(settings) {
        const query = settings_queries.UPDATE_SETTINGS;
        const db = await getDB();

        return new Promise((resolve, reject) => {
            db.run(query,
                [settings.value, settings.key],
                (err, result) => {
                if (err) return reject(err);
                resolve(result);
            });
        });
    }
}