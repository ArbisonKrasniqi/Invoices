const INSERT_TAX_TYPE = `
    INSERT INTO Tax_types (label, value)
    VALUES (?, ?);
`;

const GET_TAX_TYPES = `
    SELECT DISTINCT * FROM Tax_types
`;

const UPDATE_TAX_TYPE = `
    UPDATE Tax_types
    SET
        label = ?,
        value = ?
    WHERE tax_type_id = ?;
`;

const DELETE_TAX_TYPE = `
    DELETE FROM Tax_types WHERE tax_type_id = ?;
`;

module.exports = {
    INSERT_TAX_TYPE,
    GET_TAX_TYPES,
    UPDATE_TAX_TYPE,
    DELETE_TAX_TYPE,
}