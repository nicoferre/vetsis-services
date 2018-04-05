const dao = require('../dao/mongoDBDao');

const newCustomerController = (customer) => {
  const promise = (resolve, reject) => {
    dao.storeCustomer(customer)
      .then((customer) => resolve(customer), err => reject(err));
  };
  return new Promise(promise);
};

const modifyCustomerController = (customer) => {
  const promise = (resolve, reject) => {
    dao.modifyCustomer(customer)
      .then(() => resolve(), err => reject(err));
  };
  return new Promise(promise);
};

const showCustomerController = (customerId, callbackSuccess) => {
  dao.showCustomer(customerId, callbackSuccess);
};

const deleteCustomerController = customerId => dao.deleteCustomer(customerId);

module.exports = {
  newCustomerController,
  deleteCustomerController,
  modifyCustomerController,
  showCustomerController
};
