const dao = require('../dao/mongoDBDao');

const availableCustomersController = () => dao.availableCustomers();

const newCustomerController = (customer) => {
  const promise = (resolve, reject) => {
    dao.storeCustomer(customer).then(() => resolve(), err => reject(err));
  }
  return new Promise(promise);
}
module.exports = {
  availableCustomersController,
  newCustomerController,
};
