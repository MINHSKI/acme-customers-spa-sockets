const seed = (models)=> {
  const { Customer } = models;
  return Promise.all([
    Customer.create({ email: 'moe@gmail.com' }),
    Customer.create({ email: 'larry@gmail.com' }),
  ]);
};

module.exports = seed;
