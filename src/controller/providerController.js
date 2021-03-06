const dao = require('../dao/mongoDBDao');

const showProviders = (providerId, callbackSuccess) => {
  dao.showProviders(providerId, callbackSuccess);
};

const showOrders = (providerId, callbackSuccess) => {
  dao.showOrders(providerId, callbackSuccess);
};

const newOrder = (order) => {
  const promise = (resolve, reject) => {
    dao.newOrder(order)
      .then((order) => resolve(order), err => reject(err));
  };
  return new Promise(promise);
};

const newProvider = (provider) => {
  const promise = (resolve, reject) => {
    dao.newProvider(provider)
      .then((provider) => resolve(provider), err => reject(err));
  };
  return new Promise(promise);
};

const deleteProvider = providerId => dao.deleteProvider(providerId);

const deleteOrder = orderId => dao.deleteOrder(orderId);

module.exports = {
  showProviders,
  newOrder,
  showOrders,
  newProvider,
  deleteProvider,
  deleteOrder,
};
