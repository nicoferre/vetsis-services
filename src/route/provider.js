const providerController = require('../controller/providerController');

const showProviders = (req, res) => {
  const providerId = req.headers.provider_id;
  let callbackSuccess = function callbackSuccess(providers) {
    return res.send(providers);
  };
  providerController.showProviders(providerId, callbackSuccess);
};

module.exports = {
  showProviders,
};
