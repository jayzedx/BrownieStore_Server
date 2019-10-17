const db = require('../util/database');
const filter = require("../util/filter");
const moment = require('moment');
const momentz = require('moment-timezone');

const ROLE_USER = 0;
const ROLE_ADMIN = 1;

module.exports = class Users {
  constructor(id, email, password, token, firstname, lastname, address, tel, isSocialLogin, isActive) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.token = token;
    this.firstname = firstname;
    this.lastname = lastname;
    this.address = address;
    this.tel = tel;
    this.role_id = ROLE_USER
    this.isSocialLogin = isSocialLogin;
    this.isActive = isActive;
    this.createdAt = moment().tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss");
    this.updatedAt = moment().tz("Asia/Bangkok").format("YYYY-MM-DD HH:mm:ss");
  }

  async save() {
    const data =  await filter.filterData(
      [
        this.email,
        this.password,
        this.token,
        this.firstname,
        this.lastname,
        this.address,
        this.tel,
        this.createdAt,
        this.updatedAt,
        this.isSocialLogin,
        this.isActive,
        this.role_id,
        this.email //check email is existing
      ]
    );
    return db.execute(
      "INSERT INTO users (user_email, user_password, user_social_token, user_firstname, user_lastname, user_address, user_tel, created_at, updated_at, is_social_login, is_active, role_id) " +
      "SELECT * FROM (SELECT ? AS a, ? AS b, ? AS c, ? AS d, ? AS e, ? AS f, ? AS g, ? AS h, ? AS i, ? AS j, ? AS k, ? AS L) AS tmp " +
      "WHERE NOT EXISTS ( " +
      "SELECT user_email FROM users WHERE user_email = ? ) LIMIT 1 ",
      // "INSERT INTO users (user_email, user_password, user_social_token, user_firstname, user_lastname, user_address, user_tel, created_at, updated_at, is_social_login, is_active) " +
      //   "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"
      data
    );
  }
  static async findByEmail(email) {
    const data =  await filter.filterData([email]);
    return db.execute(
      "SELECT * FROM users WHERE user_email = ? LIMIT 1",
      data
    );
  }
}