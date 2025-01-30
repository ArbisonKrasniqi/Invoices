const GET_SETTINGS = `
    SELECT * FROM Settings
`;

const UPDATE_SETTINGS = `
    UPDATE Settings
    SET 
        value = ?
    WHERE key = ?;
`;

module.exports = {
    GET_SETTINGS,
    UPDATE_SETTINGS,
}