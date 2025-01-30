const INSERT_UNIT = `
    INSERT INTO Units (name)
    VALUES (?);
`;

const GET_UNITS = `
    SELECT DISTINCT * FROM units
`;

const UPDATE_UNIT = `
    UPDATE Units
    SET
        name = ?
    WHERE unit_id = ?;
`;

const DELETE_UNIT = `
    DELETE FROM Units WHERE unit_id = ?;
`;

module.exports = {
    INSERT_UNIT,
    GET_UNITS,
    UPDATE_UNIT,
    DELETE_UNIT,
}