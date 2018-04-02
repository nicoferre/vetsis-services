const dao = require('../dao/mongoDBDao');

const showProviders = (providerId, callbackSuccess) => {
  dao.showProviders(providerId, callbackSuccess);
};

const showOrders = (callbackSuccess) => {
  dao.showOrders(callbackSuccess);
};

const newOrder = (order) => {
  const promise = (resolve, reject) => {
    dao.newOrder(order)
      .then(() => resolve(), err => reject(err));
  };
  return new Promise(promise);
};

module.exports = {
  showProviders,
  newOrder,
  showOrders,
};
