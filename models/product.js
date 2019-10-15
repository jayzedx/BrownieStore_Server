const db = require("../util/database");
const moment = require("moment");
const momentz = require("moment-timezone");

module.exports = class Product {
  constructor(id, name, unitName, desc, imgUrl, rating, typeId, isActive) {
    this.id = id;
    this.name = name;
    this.unitName = unitName;
    this.desc = desc;
    this.imgUrl = imgUrl;
    this.rating = rating;
    this.typeId = typeId;
    this.isActive = isActive;
    this.createdAt = moment().tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss");
    this.updatedAt = moment().tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss");
  }

  save() {
    return db.execute(
      "INSERT INTO products (product_name, product_unit, product_desc, product_img_url, product_rating, type_id, created_at, updated_at, is_active) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        this.name,
        this.unitName,
        this.desc,
        this.imgUrl,
        this.rating,
        this.typeId,
        this.createdAt,
        this.updatedAt,
        this.isActive
      ]
    );
  }

  update() {
    return db.execute(
      "UPDATE products SET product_name=?, product_unit=?, product_desc=?, product_img_url=?, product_rating=?, type_id=?, updated_at=?, is_active=? " +
        "WHERE id=?",
      [
        this.name,
        this.unitName,
        this.desc,
        this.imgUrl,
        this.rating,
        this.typeId,
        this.updatedAt,
        this.isActive,
        this.id
      ]
    );
  }

  static deleteById(id) {}

  static testCallback(cb) {
    return db.execute("SELECT * FROM products WHERE is_active = 1", cb);
  }

  static fetchAll() {
    return db.execute("SELECT * FROM products WHERE is_active = 1");
  }

  static findById(id) {
    return db.execute(
      "SELECT * FROM products WHERE products.id = ? AND is_active = 1",
      [id]
    );
  }
};