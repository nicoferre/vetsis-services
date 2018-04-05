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
  providerController.newOrder(content)
    .then((order) => {
      res.status(200)
        .send(order);
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

const newProvider = (req, res) => {
  const content = req.body;
  providerController.newProvider(content)
    .then((order) => {
      res.status(200)
        .send(order);
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

const deleteProvider = (req, res) => {
  const providerId = req.headers.provider_id;
  console.info(providerId);
  const success = (data) => {
    console.info(data);
    if (data === 0) {
      const error = {
        error: {
          code: 404,
          message: 'No provider found with that name.',
        },
      };
      return res.status(404)
        .send(error);
    } else {
      res.status(204)
        .send();
    }
  };

  const error = () => {
    const error = {
      error: {
        code: 500,
        message: 'Internal Server Error.',
      },
    };
    return res.status(500)
      .send(error);
  };

  providerController
    .deleteProvider(providerId)
    .then(success, error);
};

module.exports = {
  showProviders,
  newOrder,
  showOrders,
  newProvider,
  deleteProvider,
};
