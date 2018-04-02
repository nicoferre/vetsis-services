const providerController = require('../controller/providerController');

const showProviders = (req, res) => {
  const providerId = req.headers.provider_id;
  let callbackSuccess = function callbackSuccess(providers) {
    return res.send(providers);
  };
  providerController.showProviders(providerId, callbackSuccess);
};

const showOrders = (req, res) => {
  let callbackSuccess = function callbackSuccess(orders) {
    return res.send(orders);
  };
  providerController.showOrders(callbackSuccess);
};

const newOrder = (req, res) => {
  const content = req.body;
  console.info(content);
  providerController.newOrder(content)
    .then(() => {
      res.status(201)
        .send();
    }, (err) => {
      res.status(err.code)
        .send({
          error: {
            code: err.code,
            message: err.message,
          },
        });
    });
};

module.exports = {
  showProviders,
  newOrder,
  showOrders,
};
