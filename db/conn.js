const Sequelize = require('sequelize');
const conn = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme_customer_addresses_db', { logging: false });

module.exports = conn;
