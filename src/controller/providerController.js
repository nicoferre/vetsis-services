const dao = require('../dao/mongoDBDao');

const showProviders = (providerId, callbackSuccess) => {
  dao.showProviders(providerId, callbackSuccess);
};

module.exports = {
  showProviders,
};
