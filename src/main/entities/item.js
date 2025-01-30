class Item {
    constructor(item_id = null, name = null, price = null, unit_id = null, tax_type_id = null) {
        this.item_id = item_id;
        this.name = name;
        this.price = price;
        this.unit_id = unit_id;
        this.tax_type_id = tax_type_id;
    }
}

module.exports = Item;