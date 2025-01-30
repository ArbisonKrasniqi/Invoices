const INSERT_ITEM = `
    INSERT INTO Items (name, price, unit_id, tax_type_id)
    VALUES (?, ?, ? ,?);
`;

const GET_ITEMS = `
    SELECT DISTINCT * FROM Items
`;

const GET_ITEMS_BY_UNIT = `
    SELECT DISTINCT * FROM Items
    WHERE unit_id = ?;
`;

const GET_ITEMS_BY_TAX_TYPE = `
    SELECT DISTINCT * FROM Items
    WHERE tax_type_id = ?;
`;

const UPDATE_ITEM = `
    UPDATE Items
    SET
        name = ?,
        price = ?,
        unit_id = ?,
        tax_type_id = ?
    WHERE item_id = ?;
`;

const DELETE_ITEM = `
    DELETE FROM Items WHERE item_id = ?;
`;

module.exports = {
    INSERT_ITEM,
    GET_ITEMS,
    UPDATE_ITEM,
    DELETE_ITEM,
    GET_ITEMS_BY_UNIT,
    GET_ITEMS_BY_TAX_TYPE
}