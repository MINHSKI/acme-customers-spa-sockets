const conn  = require('./conn');
const { Sequelize } = conn;

const Customer = conn.define('customer', {
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  }
});

module.exports = Customer;
