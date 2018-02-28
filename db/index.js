const conn = require('./conn');

const Customer = require('./Customer');

const models = {
  Customer
};

const sync = ()=> {
  return conn.sync({ force: true });
};

const seed = ()=> {
  return require('./seed')(models);

};

module.exports = {
  sync,
  seed,
  models
};
